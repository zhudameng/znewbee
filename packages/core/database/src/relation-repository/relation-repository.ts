import lodash from 'lodash';
import { Association, BelongsTo, BelongsToMany, HasMany, HasOne, ModelCtor, Transaction } from 'sequelize';
import { Collection } from '../collection';
import Database from '../database';
import { RelationField } from '../fields/relation-field';
import FilterParser from '../filter-parser';
import { Model } from '../model';
import { OptionsParser } from '../options-parser';
import { CreateOptions, Filter, FindOptions } from '../repository';
import { transactionWrapperBuilder } from '../transaction-decorator';
import { updateAssociations } from '../update-associations';
import { UpdateGuard } from '../update-guard';

export const transaction = transactionWrapperBuilder(function () {
  return this.sourceCollection.model.sequelize.transaction();
});

export abstract class RelationRepository {
  sourceCollection: Collection;
  association: Association;
  targetModel: ModelCtor<any>;
  targetCollection: Collection;
  associationName: string;
  associationField: RelationField;
  sourceKeyValue: string | number;
  sourceInstance: Model;
  db: Database;

  constructor(sourceCollection: Collection, association: string, sourceKeyValue: string | number) {
    this.db = sourceCollection.context.database;

    this.sourceCollection = sourceCollection;
    this.sourceKeyValue = sourceKeyValue;
    this.associationName = association;
    this.association = this.sourceCollection.model.associations[association];

    this.associationField = this.sourceCollection.getField(association);

    this.targetModel = this.association.target;
    this.targetCollection = this.sourceCollection.context.database.modelCollection.get(this.targetModel);
  }

  targetKey() {
    return this.associationField.targetKey;
  }

  protected accessors() {
    return (<BelongsTo | HasOne | HasMany | BelongsToMany>this.association).accessors;
  }

  async create(options?: CreateOptions): Promise<any> {
    const createAccessor = this.accessors().create;

    const guard = UpdateGuard.fromOptions(this.targetModel, options);
    const values = options.values;
    const transaction = await this.getTransaction(options);

    const sourceModel = await this.getSourceModel(transaction);

    const instance = await sourceModel[createAccessor](guard.sanitize(options.values), { ...options, transaction });

    await updateAssociations(instance, values, { ...options, transaction });

    if (options.hooks !== false) {
      await this.db.emitAsync(`${this.targetCollection.name}.afterCreateWithAssociations`, instance, {
        ...options,
        transaction,
      });
      const eventName = `${this.targetCollection.name}.afterSaveWithAssociations`;
      await this.db.emitAsync(eventName, instance, { ...options, transaction });
    }

    return instance;
  }

  async getSourceModel(transaction?: Transaction) {
    if (!this.sourceInstance) {
      this.sourceInstance = await this.sourceCollection.model.findOne({
        where: {
          [this.associationField.sourceKey]: this.sourceKeyValue,
        },
        transaction,
      });
    }

    return this.sourceInstance;
  }

  protected buildQueryOptions(options: FindOptions) {
    const parser = new OptionsParser(options, {
      collection: this.targetCollection,
      targetKey: this.targetKey(),
    });
    const params = parser.toSequelizeParams();
    return { ...options, ...params };
  }

  protected parseFilter(filter: Filter, options?: any) {
    const parser = new FilterParser(filter, {
      collection: this.targetCollection,
      app: {
        ctx: options?.context,
      },
    });
    return parser.toSequelizeParams();
  }

  protected async getTransaction(options: any, autoGen = false): Promise<Transaction | null> {
    if (lodash.isPlainObject(options) && options.transaction) {
      return options.transaction;
    }

    if (autoGen) {
      return await this.sourceCollection.model.sequelize.transaction();
    }

    return null;
  }
}
