import {
  Association,
  BelongsTo,
  BelongsToMany,
  HasMany,
  HasOne,
  Hookable,
  ModelCtor,
  Transactionable,
} from 'sequelize';
import { Model } from './model';
import { UpdateGuard } from './update-guard';

function isUndefinedOrNull(value: any) {
  return typeof value === 'undefined' || value === null;
}

function isStringOrNumber(value: any) {
  return typeof value === 'string' || typeof value === 'number';
}

function getKeysByPrefix(keys: string[], prefix: string) {
  return keys.filter((key) => key.startsWith(`${prefix}.`)).map((key) => key.substring(prefix.length + 1));
}

export function modelAssociations(instance: Model) {
  return (<typeof Model>instance.constructor).associations;
}

export function belongsToManyAssociations(instance: Model): Array<BelongsToMany> {
  const associations = modelAssociations(instance);
  return Object.entries(associations)
    .filter((entry) => {
      const [key, association] = entry;
      return association.associationType == 'BelongsToMany';
    })
    .map((association) => {
      return <BelongsToMany>association[1];
    });
}

export function modelAssociationByKey(instance: Model, key: string): Association {
  return modelAssociations(instance)[key] as Association;
}

type UpdateValue = { [key: string]: any };

interface UpdateOptions extends Transactionable {
  filter?: any;
  filterByTk?: number | string;
  // 字段白名单
  whitelist?: string[];
  // 字段黑名单
  blacklist?: string[];
  // 关系数据默认会新建并建立关联处理，如果是已存在的数据只关联，但不更新关系数据
  // 如果需要更新关联数据，可以通过 updateAssociationValues 指定
  updateAssociationValues?: string[];
  sanitized?: boolean;
  sourceModel?: Model;
}

interface UpdateAssociationOptions extends Transactionable, Hookable {
  updateAssociationValues?: string[];
  sourceModel?: Model;
  context?: any;
  associationContext?: any;
}

export async function updateModelByValues(instance: Model, values: UpdateValue, options?: UpdateOptions) {
  if (!options?.sanitized) {
    const guard = new UpdateGuard();
    //@ts-ignore
    guard.setModel(instance.constructor);
    guard.setBlackList(options.blacklist);
    guard.setWhiteList(options.whitelist);
    guard.setAssociationKeysToBeUpdate(options.updateAssociationValues);
    values = guard.sanitize(values);
  }

  await instance.update(values, options);
  await updateAssociations(instance, values, options);
}

export async function updateThroughTableValue(
  instance: Model,
  throughName: string,
  throughValues: any,
  source: Model,
  transaction = null,
) {
  // update through table values
  for (const belongsToMany of belongsToManyAssociations(instance)) {
    // @ts-ignore
    const throughModel = belongsToMany.through.model;
    const throughModelName = throughModel.name;

    if (throughModelName === throughModelName) {
      const where = {
        [belongsToMany.foreignKey]: instance.get(belongsToMany.sourceKey),
        [belongsToMany.otherKey]: source.get(belongsToMany.targetKey),
      };

      return await throughModel.update(throughValues, {
        where,
        transaction,
      });
    }
  }
}

/**
 * update association of instance by values
 * @param instance
 * @param values
 * @param options
 */
export async function updateAssociations(instance: Model, values: any, options: UpdateAssociationOptions = {}) {
  // if no values set, return
  if (!values) {
    return;
  }

  let newTransaction = false;
  let transaction = options.transaction;

  if (!transaction) {
    newTransaction = true;
    transaction = await instance.sequelize.transaction();
  }

  const keys = Object.keys(values);

  for (const key of Object.keys(modelAssociations(instance))) {
    if (keys.includes(key)) {
      await updateAssociation(instance, key, values[key], {
        ...options,
        transaction,
      });
    }
  }

  // update through table values
  for (const belongsToMany of belongsToManyAssociations(instance)) {
    // @ts-ignore
    const throughModel = belongsToMany.through.model;
    const throughModelName = throughModel.name;

    if (values[throughModelName] && options.sourceModel) {
      const where = {
        [belongsToMany.foreignKey]: instance.get(belongsToMany.sourceKey),
        [belongsToMany.otherKey]: options.sourceModel.get(belongsToMany.targetKey),
      };

      await throughModel.update(values[throughModel.name], {
        where,
        context: options.context,
        transaction,
      });
    }
  }

  if (newTransaction) {
    await transaction.commit();
  }
}

function isReverseAssociationPair(a: any, b: any) {
  const typeSet = new Set();
  typeSet.add(a.associationType);
  typeSet.add(b.associationType);

  if (typeSet.size == 1 && typeSet.has('BelongsToMany')) {
    return (
      a.through.tableName === b.through.tableName &&
      a.target.name === b.source.name &&
      b.target.name === a.source.name &&
      a.foreignKey === b.otherKey &&
      a.sourceKey === b.targetKey &&
      a.otherKey === b.foreignKey &&
      a.targetKey === b.sourceKey
    );
  }

  if ((typeSet.has('HasOne') && typeSet.has('BelongsTo')) || (typeSet.has('HasMany') && typeSet.has('BelongsTo'))) {
    const sourceAssoc = a.associationType == 'BelongsTo' ? b : a;
    const targetAssoc = sourceAssoc == a ? b : a;

    return (
      sourceAssoc.source.name === targetAssoc.target.name &&
      sourceAssoc.foreignKey === targetAssoc.foreignKey &&
      sourceAssoc.sourceKey === targetAssoc.targetKey
    );
  }

  return false;
}

/**
 * update model association by key
 * @param instance
 * @param key
 * @param value
 * @param options
 */
export async function updateAssociation(
  instance: Model,
  key: string,
  value: any,
  options: UpdateAssociationOptions = {},
) {
  const association = modelAssociationByKey(instance, key);

  if (!association) {
    return false;
  }

  if (options.associationContext && isReverseAssociationPair(association, options.associationContext)) {
    return false;
  }

  switch (association.associationType) {
    case 'HasOne':
    case 'BelongsTo':
      return updateSingleAssociation(instance, key, value, options);
    case 'HasMany':
    case 'BelongsToMany':
      return updateMultipleAssociation(instance, key, value, options);
  }
}

/**
 * update belongsTo and HasOne
 * @param model
 * @param key
 * @param value
 * @param options
 */
export async function updateSingleAssociation(
  model: Model,
  key: string,
  value: any,
  options: UpdateAssociationOptions = {},
) {
  const association = <HasOne | BelongsTo>modelAssociationByKey(model, key);

  if (!association) {
    return false;
  }

  if (!['undefined', 'string', 'number', 'object'].includes(typeof value)) {
    return false;
  }

  const { context, updateAssociationValues = [], transaction = await model.sequelize.transaction() } = options;
  const keys = getKeysByPrefix(updateAssociationValues, key);

  try {
    // set method of association
    const setAccessor = association.accessors.set;

    const removeAssociation = async () => {
      await model[setAccessor](null, { transaction });
      model.setDataValue(key, null);
      if (!options.transaction) {
        await transaction.commit();
      }
      return true;
    };

    if (isUndefinedOrNull(value)) {
      return await removeAssociation();
    }

    if (isStringOrNumber(value)) {
      await model[setAccessor](value, { context, transaction });
      if (!options.transaction) {
        await transaction.commit();
      }
      return true;
    }

    if (value instanceof Model) {
      await model[setAccessor](value, { context, transaction });
      model.setDataValue(key, value);

      if (!options.transaction) {
        await transaction.commit();
      }
      return true;
    }

    const createAccessor = association.accessors.create;
    let dataKey: string;
    let M: ModelCtor<Model>;
    if (association.associationType === 'BelongsTo') {
      M = association.target as ModelCtor<Model>;
      // @ts-ignore
      dataKey = association.targetKey;
    } else {
      M = association.source as ModelCtor<Model>;
      dataKey = M.primaryKeyAttribute;
    }

    if (isStringOrNumber(value[dataKey])) {
      let instance: any = await M.findOne({
        where: {
          [dataKey]: value[dataKey],
        },
        transaction,
      });

      if (instance) {
        await model[setAccessor](instance, { context, transaction });

        if (updateAssociationValues.includes(key)) {
          await instance.update(value, { ...options, transaction });
        }

        await updateAssociations(instance, value, {
          ...options,
          transaction,
          associationContext: association,
          updateAssociationValues: keys,
        });
        model.setDataValue(key, instance);
        if (!options.transaction) {
          await transaction.commit();
        }
        return true;
      }
    }

    const instance = await model[createAccessor](value, { context, transaction });
    await updateAssociations(instance, value, {
      ...options,
      transaction,
      associationContext: association,
      updateAssociationValues: keys,
    });
    model.setDataValue(key, instance);
    // @ts-ignore
    if (association.targetKey) {
      model.setDataValue(association.foreignKey, instance[dataKey]);
    }
    if (!options.transaction) {
      await transaction.commit();
    }
  } catch (error) {
    if (!options.transaction) {
      await transaction.rollback();
    }
    throw error;
  }
}

/**
 * update multiple association of model by value
 * @param model
 * @param key
 * @param value
 * @param options
 */
export async function updateMultipleAssociation(
  model: Model,
  key: string,
  value: any,
  options: UpdateAssociationOptions = {},
) {
  const association = <BelongsToMany | HasMany>modelAssociationByKey(model, key);

  if (!association) {
    return false;
  }

  if (!['undefined', 'string', 'number', 'object'].includes(typeof value)) {
    return false;
  }

  const { context, updateAssociationValues = [], transaction = await model.sequelize.transaction() } = options;
  const keys = getKeysByPrefix(updateAssociationValues, key);

  try {
    const setAccessor = association.accessors.set;

    const createAccessor = association.accessors.create;
    if (isUndefinedOrNull(value)) {
      await model[setAccessor](null, { transaction, context });
      model.setDataValue(key, null);
      return;
    }

    if (isStringOrNumber(value)) {
      await model[setAccessor](value, { transaction, context });
      return;
    }

    if (!Array.isArray(value)) {
      value = [value];
    }

    const list1 = []; // to be setted
    const list2 = []; // to be added
    for (const item of value) {
      if (isUndefinedOrNull(item)) {
        continue;
      }
      if (isStringOrNumber(item)) {
        list1.push(item);
      } else if (item instanceof Model) {
        list1.push(item);
      } else if (item.sequelize) {
        list1.push(item);
      } else if (typeof item === 'object') {
        list2.push(item);
      }
    }

    // associate targets in lists1
    await model[setAccessor](list1, { transaction, context });

    const list3 = [];
    for (const item of list2) {
      const pk = association.target.primaryKeyAttribute;

      const through = (<any>association).through ? (<any>association).through.model.name : null;

      const accessorOptions = {
        context,
        transaction,
      };

      const throughValue = item[through];

      if (throughValue) {
        accessorOptions['through'] = throughValue;
      }

      if (isUndefinedOrNull(item[pk])) {
        // create new record
        const instance = await model[createAccessor](item, accessorOptions);
        await updateAssociations(instance, item, {
          ...options,
          transaction,
          associationContext: association,
          updateAssociationValues: keys,
        });
        list3.push(instance);
      } else {
        // set & update record
        const instance = await association.target.findByPk<any>(item[pk], {
          transaction,
        });
        const addAccessor = association.accessors.add;

        await model[addAccessor](item[pk], accessorOptions);
        if (updateAssociationValues.includes(key)) {
          await instance.update(item, { ...options, transaction });
        }
        await updateAssociations(instance, item, {
          ...options,
          transaction,
          associationContext: association,
          updateAssociationValues: keys,
        });
        list3.push(instance);
      }
    }

    model.setDataValue(key, list1.concat(list3));
    if (!options.transaction) {
      await transaction.commit();
    }
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
