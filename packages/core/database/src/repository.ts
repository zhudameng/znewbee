import lodash, { omit } from 'lodash';
import {
  Association,
  BulkCreateOptions,
  CreateOptions as SequelizeCreateOptions,
  DestroyOptions as SequelizeDestroyOptions,
  FindAndCountOptions as SequelizeAndCountOptions,
  FindOptions as SequelizeFindOptions,
  ModelCtor,
  Op,
  Transactionable,
  UpdateOptions as SequelizeUpdateOptions
} from 'sequelize';
import { Collection } from './collection';
import { Database } from './database';
import { RelationField } from './fields';
import FilterParser from './filter-parser';
import { Model } from './model';
import { OptionsParser } from './options-parser';
import { BelongsToManyRepository } from './relation-repository/belongs-to-many-repository';
import { BelongsToRepository } from './relation-repository/belongs-to-repository';
import { HasManyRepository } from './relation-repository/hasmany-repository';
import { HasOneRepository } from './relation-repository/hasone-repository';
import { RelationRepository } from './relation-repository/relation-repository';
import { transactionWrapperBuilder } from './transaction-decorator';
import { updateAssociations, updateModelByValues } from './update-associations';
import { UpdateGuard } from './update-guard';

const debug = require('debug')('noco-database');

export interface IRepository {}

interface CreateManyOptions extends BulkCreateOptions {
  records: Values[];
}

export { Transactionable } from 'sequelize';

export interface FilterAble {
  filter: Filter;
}

export type TargetKey = string | number;
export type TK = TargetKey | TargetKey[];

export type Filter = any;
export type Appends = string[];
export type Except = string[];
export type Fields = string[];
export type Sort = string[] | string;

export type WhiteList = string[];
export type BlackList = string[];
export type AssociationKeysToBeUpdate = string[];

export type Values = any;

export interface CountOptions extends Omit<SequelizeCreateOptions, 'distinct' | 'where' | 'include'>, Transactionable {
  fields?: Fields;
  filter?: Filter;
}

export interface FilterByTk {
  filterByTk?: TargetKey;
}

export interface FindOptions extends SequelizeFindOptions, CommonFindOptions, FilterByTk {}

export interface CommonFindOptions extends Transactionable {
  filter?: Filter;
  fields?: Fields;
  appends?: Appends;
  except?: Except;
  sort?: Sort;
  context?: any;
}

interface FindOneOptions extends FindOptions, CommonFindOptions {}

export interface DestroyOptions extends SequelizeDestroyOptions {
  filter?: Filter;
  filterByTk?: TargetKey | TargetKey[];
  truncate?: boolean;
  context?: any;
}

interface FindAndCountOptions extends Omit<SequelizeAndCountOptions, 'where' | 'include' | 'order'> {
  // 数据过滤
  filter?: Filter;
  // 输出结果显示哪些字段
  fields?: Fields;
  // 输出结果不显示哪些字段
  except?: Except;
  // 附加字段，用于控制关系字段的输出
  appends?: Appends;
  // 排序，字段前面加上 “-” 表示降序
  sort?: Sort;
}

export interface CreateOptions extends SequelizeCreateOptions {
  values?: Values;
  whitelist?: WhiteList;
  blacklist?: BlackList;
  updateAssociationValues?: AssociationKeysToBeUpdate;
  context?: any;
}

export interface UpdateOptions extends Omit<SequelizeUpdateOptions, 'where'> {
  values: Values;
  filter?: Filter;
  filterByTk?: TargetKey;
  whitelist?: WhiteList;
  blacklist?: BlackList;
  updateAssociationValues?: AssociationKeysToBeUpdate;
  context?: any;
}

interface RelatedQueryOptions {
  database: Database;
  field: RelationField;
  source: {
    idOrInstance: any;
    collection: Collection;
  };
  target: {
    association: Association & {
      accessors: any;
    };
    collection: Collection;
  };
}

const transaction = transactionWrapperBuilder(function () {
  return (<Repository>this).collection.model.sequelize.transaction();
});

class RelationRepositoryBuilder<R extends RelationRepository> {
  collection: Collection;
  associationName: string;
  association: Association;

  builderMap = {
    HasOne: HasOneRepository,
    BelongsTo: BelongsToRepository,
    BelongsToMany: BelongsToManyRepository,
    HasMany: HasManyRepository,
  };

  constructor(collection: Collection, associationName: string) {
    this.collection = collection;
    this.associationName = associationName;
    this.association = this.collection.model.associations[this.associationName];
  }

  protected builder() {
    return this.builderMap;
  }

  of(id: string | number): R {
    const klass = this.builder()[this.association.associationType];
    return new klass(this.collection, this.associationName, id);
  }
}

export class Repository<TModelAttributes extends {} = any, TCreationAttributes extends {} = TModelAttributes>
  implements IRepository
{
  database: Database;
  collection: Collection;
  model: ModelCtor<Model>;

  constructor(collection: Collection) {
    this.database = collection.context.database;
    this.collection = collection;
    this.model = collection.model;
  }

  /**
   * return count by filter
   */
  async count(countOptions?: CountOptions): Promise<number> {
    let options = countOptions ? lodash.clone(countOptions) : {};

    const transaction = await this.getTransaction(options);

    if (countOptions?.filter) {
      options = {
        ...options,
        ...this.parseFilter(countOptions.filter, countOptions),
      };
    }

    const count = await this.collection.model.count({
      ...options,
      distinct: true,
      transaction,
    });

    return count;
  }

  /**
   * find
   * @param options
   */
  async find(options?: FindOptions) {
    const model = this.collection.model;
    const transaction = await this.getTransaction(options);

    const opts = {
      subQuery: false,
      ...this.buildQueryOptions(options),
    };

    if (opts.include && opts.include.length > 0) {
      // @ts-ignore
      const primaryKeyField = model.primaryKeyField || model.primaryKeyAttribute;

      const ids = (
        await model.findAll({
          ...opts,
          includeIgnoreAttributes: false,
          attributes: [primaryKeyField],
          group: `${model.name}.${primaryKeyField}`,
          transaction,
        })
      ).map((row) => row.get(primaryKeyField));

      const where = {
        [primaryKeyField]: {
          [Op.in]: ids,
        },
      };

      return await model.findAll({
        ...omit(opts, ['limit', 'offset']),
        where,
        transaction,
      });
    }

    return await model.findAll({
      ...opts,
      transaction,
    });
  }

  /**
   * find and count
   * @param options
   */
  async findAndCount(options?: FindAndCountOptions): Promise<[Model[], number]> {
    const transaction = await this.getTransaction(options);
    options = {
      ...options,
      transaction,
    };

    return [await this.find(options), await this.count(options)];
  }

  /**
   * Find By Id
   *
   */
  findById(id: string | number) {
    return this.collection.model.findByPk(id);
  }

  /**
   * Find one record from database
   *
   * @param options
   */
  async findOne(options?: FindOneOptions) {
    const transaction = await this.getTransaction(options);

    const rows = await this.find({ ...options, limit: 1, transaction });
    return rows.length == 1 ? rows[0] : null;
  }

  /**
   * Save instance to database
   *
   * @param values
   * @param options
   */
  @transaction()
  async create<M extends Model>(options: CreateOptions): Promise<M> {
    const transaction = await this.getTransaction(options);

    const guard = UpdateGuard.fromOptions(this.model, { ...options, action: 'create' });
    const values = guard.sanitize(options.values || {});

    const instance = await this.model.create<any>(values, {
      ...options,
      transaction,
    });

    if (!instance) {
      return;
    }

    await updateAssociations(instance, values, {
      ...options,
      transaction,
    });

    if (options.hooks !== false) {
      await this.database.emitAsync(`${this.collection.name}.afterCreateWithAssociations`, instance, options);
      await this.database.emitAsync(`${this.collection.name}.afterSaveWithAssociations`, instance, options);
    }

    return instance;
  }

  /**
   * Save Many instances to database
   *
   * @param records
   * @param options
   */
  @transaction()
  async createMany(options: CreateManyOptions) {
    const transaction = await this.getTransaction(options);
    const { records } = options;
    const instances = [];
    for (const values of records) {
      const instance = await this.create({ values, transaction });
      instances.push(instance);
    }
    return instances;
  }

  /**
   * Update model value
   *
   * @param values
   * @param options
   */
  @transaction()
  async update(options: UpdateOptions) {
    const transaction = await this.getTransaction(options);
    const guard = UpdateGuard.fromOptions(this.model, options);

    const values = guard.sanitize(options.values);

    const queryOptions = this.buildQueryOptions(options);

    const instances = await this.find({
      ...queryOptions,
      transaction,
    });

    for (const instance of instances) {
      await updateModelByValues(instance, values, {
        ...options,
        sanitized: true,
        transaction,
      });
    }

    if (options.hooks !== false) {
      for (const instance of instances) {
        await this.database.emitAsync(`${this.collection.name}.afterUpdateWithAssociations`, instance, options);
        await this.database.emitAsync(`${this.collection.name}.afterSaveWithAssociations`, instance, options);
      }
    }

    return instances;
  }

  @transaction((args, transaction) => {
    return {
      filterByTk: args[0],
      transaction,
    };
  })
  async destroy(options?: TargetKey | TargetKey[] | DestroyOptions) {
    const transaction = await this.getTransaction(options);

    const modelFilterKey = this.collection.filterTargetKey;

    options = <DestroyOptions>options;

    if (options['individualHooks'] === undefined) {
      options['individualHooks'] = true;
    }

    const filterByTk: TargetKey[] | undefined =
      options.filterByTk && !lodash.isArray(options.filterByTk)
        ? [options.filterByTk]
        : (options.filterByTk as TargetKey[] | undefined);

    if (filterByTk && !options.filter) {
      return await this.model.destroy({
        ...options,
        where: {
          [modelFilterKey]: {
            [Op.in]: filterByTk,
          },
        },
        transaction,
      });
    }

    if (options.filter) {
      let pks = (
        await this.find({
          filter: options.filter,
          transaction,
        })
      ).map((instance) => instance.get(modelFilterKey) as TargetKey);

      if (filterByTk) {
        pks = lodash.intersection(
          pks.map((i) => `${i}`),
          filterByTk.map((i) => `${i}`),
        );
      }

      return await this.destroy({
        ...lodash.omit(options, 'filter'),
        filterByTk: pks,
        transaction,
      });
    }

    if (options.truncate) {
      return await this.model.destroy({
        ...options,
        truncate: true,
        transaction,
      });
    }
  }

  /**
   * @param association target association
   */
  relation<R extends RelationRepository>(association: string): RelationRepositoryBuilder<R> {
    return new RelationRepositoryBuilder<R>(this.collection, association);
  }

  protected buildQueryOptions(options: any) {
    const parser = new OptionsParser(options, {
      collection: this.collection,
    });

    const params = parser.toSequelizeParams();
    debug('sequelize query params %o', params);
    return { where: {}, ...options, ...params };
  }

  protected parseFilter(filter: Filter, options?: any) {
    const parser = new FilterParser(filter, {
      collection: this.collection,
      app: {
        ctx: options?.context,
      },
    });
    return parser.toSequelizeParams();
  }

  protected async getTransaction(options: any, autoGen = false) {
    if (lodash.isPlainObject(options) && options.transaction) {
      return options.transaction;
    }

    if (autoGen) {
      return await this.model.sequelize.transaction();
    }

    return null;
  }
}
