import { Collection } from '@znewbee/database';
import { Plugin } from '@znewbee/server';
import { uid } from '@znewbee/utils';
import lodash from 'lodash';
import path from 'path';
import { CollectionRepository } from '.';
import {
  afterCreateForReverseField,
  beforeCreateForChildrenCollection,
  beforeCreateForReverseField,
  beforeInitOptions,
} from './hooks';
import { CollectionModel, FieldModel } from './models';

export class CollectionManagerPlugin extends Plugin {
  async beforeLoad() {
    this.app.db.registerModels({
      CollectionModel,
      FieldModel,
    });

    this.app.db.registerRepositories({
      CollectionRepository,
    });

    this.app.db.on('fields.beforeUpdate', async (model, options) => {
      const newValue = options.values;
      if (
        model.get('reverseKey') &&
        lodash.get(newValue, 'reverseField') &&
        !lodash.get(newValue, 'reverseField.key')
      ) {
        throw new Error('cant update field without a reverseField key');
      }
    });

    // 要在 beforeInitOptions 之前处理
    this.app.db.on('fields.beforeCreate', beforeCreateForReverseField(this.app.db));
    this.app.db.on('fields.beforeCreate', beforeCreateForChildrenCollection(this.app.db));
    this.app.db.on('fields.beforeCreate', async (model, options) => {
      const type = model.get('type');
      await this.app.db.emitAsync(`fields.${type}.beforeInitOptions`, model, {
        ...options,
        database: this.app.db,
      });
    });
    for (const key in beforeInitOptions) {
      if (Object.prototype.hasOwnProperty.call(beforeInitOptions, key)) {
        const fn = beforeInitOptions[key];
        this.app.db.on(`fields.${key}.beforeInitOptions`, fn);
      }
    }
    this.app.db.on('fields.afterCreate', afterCreateForReverseField(this.app.db));

    this.app.db.on('collections.afterCreateWithAssociations', async (model, { context, transaction }) => {
      if (context) {
        await model.migrate({ transaction });
      }
    });

    this.app.db.on('collections.afterDestroy', async (model, { transaction }) => {
      const name = model.get('name');

      const fields = await this.app.db.getRepository('fields').find({
        filter: {
          'type.$in': ['belongsToMany', 'belongsTo', 'hasMany', 'hasOne'],
        },
        transaction,
      });

      const deleteFieldsKey = fields
        .filter((field) => (field.get('options') as any)?.target === name)
        .map((field) => field.get('key') as string);

      await this.app.db.getRepository('fields').destroy({
        filter: {
          'key.$in': deleteFieldsKey,
        },
        transaction,
      });
    });

    this.app.db.on('fields.afterCreate', async (model, { context, transaction }) => {
      if (context) {
        await model.migrate({ transaction });
      }
    });

    this.app.db.on('fields.afterCreateWithAssociations', async (model, { context, transaction }) => {
      if (!context) {
        return;
      }
      if (!model.get('through')) {
        return;
      }
      const [throughName, sourceName, targetName] = [
        model.get('through'),
        model.get('collectionName'),
        model.get('target'),
      ];
      const db = this.app.db;
      const through = await db.getRepository('collections').findOne({
        filter: {
          name: throughName,
        },
        transaction,
      });
      if (!through) {
        return;
      }
      const repository = db.getRepository('collections.fields', throughName);
      await repository.create({
        transaction,
        values: {
          name: `f_${uid()}`,
          type: 'belongsTo',
          target: sourceName,
          targetKey: model.get('sourceKey'),
          foreignKey: model.get('foreignKey'),
          interface: 'linkTo',
          reverseField: {
            interface: 'subTable',
            uiSchema: {
              type: 'void',
              title: through.get('title'),
              'x-component': 'TableField',
              'x-component-props': {},
            },
            // uiSchema: {
            //   title: through.get('title'),
            //   'x-component': 'RecordPicker',
            //   'x-component-props': {
            //     // mode: 'tags',
            //     multiple: true,
            //     fieldNames: {
            //       label: 'id',
            //       value: 'id',
            //     },
            //   },
            // },
          },
          uiSchema: {
            title: db.getCollection(sourceName)?.options?.title || sourceName,
            'x-component': 'RecordPicker',
            'x-component-props': {
              // mode: 'tags',
              multiple: false,
              fieldNames: {
                label: 'id',
                value: 'id',
              },
            },
          },
        },
      });
      await repository.create({
        transaction,
        values: {
          name: `f_${uid()}`,
          type: 'belongsTo',
          target: targetName,
          targetKey: model.get('targetKey'),
          foreignKey: model.get('otherKey'),
          interface: 'linkTo',
          reverseField: {
            interface: 'subTable',
            uiSchema: {
              type: 'void',
              title: through.get('title'),
              'x-component': 'TableField',
              'x-component-props': {},
            },
            // interface: 'linkTo',
            // uiSchema: {
            //   title: through.get('title'),
            //   'x-component': 'RecordPicker',
            //   'x-component-props': {
            //     // mode: 'tags',
            //     multiple: true,
            //     fieldNames: {
            //       label: 'id',
            //       value: 'id',
            //     },
            //   },
            // },
          },
          uiSchema: {
            title: db.getCollection(targetName)?.options?.title || targetName,
            'x-component': 'RecordPicker',
            'x-component-props': {
              // mode: 'tags',
              multiple: false,
              fieldNames: {
                label: 'id',
                value: 'id',
              },
            },
          },
        },
      });
      await db.getRepository<CollectionRepository>('collections').load({
        filter: {
          'name.$in': [throughName, sourceName, targetName],
        },
      });
    });

    this.app.on('beforeStart', async () => {
      await this.app.db.getRepository<CollectionRepository>('collections').load();
    });

    this.app.resourcer.use(async (ctx, next) => {
      const { resourceName, actionName } = ctx.action;
      if (resourceName === 'collections.fields' && actionName === 'update') {
        const { updateAssociationValues = [] } = ctx.action.params;
        updateAssociationValues.push('uiSchema');
        ctx.action.mergeParams({
          updateAssociationValues,
        });
      }
      await next();
    });

    this.app.resourcer.use(async (ctx, next) => {
      const { resourceName, actionName } = ctx.action;
      if (actionName === 'update') {
        const { updateAssociationValues = [] } = ctx.action.params;
        const [collectionName, associationName] = resourceName.split('.');
        if (!associationName) {
          const collection: Collection = ctx.db.getCollection(collectionName);
          if (collection) {
            for (const [, field] of collection.fields) {
              if (field.options.interface === 'subTable') {
                updateAssociationValues.push(field.name);
              }
            }
          }
        } else {
          const association = ctx.db.getCollection(collectionName)?.getField?.(associationName);
          if (association?.target) {
            const collection: Collection = ctx.db.getCollection(association?.target);
            if (collection) {
              for (const [, field] of collection.fields) {
                if (field.options.interface === 'subTable') {
                  updateAssociationValues.push(field.name);
                }
              }
            }
          }
        }
        if (updateAssociationValues.length) {
          ctx.action.mergeParams({
            updateAssociationValues,
          });
        }
      }
      await next();
    });

    this.app.acl.allow('collections', 'list', 'loggedIn');
    this.app.acl.allow('collections', ['create', 'update', 'destroy'], 'allowConfigure');
  }

  async load() {
    await this.app.db.import({
      directory: path.resolve(__dirname, './collections'),
    });
  }

  getName(): string {
    return this.getPackageName(__dirname);
  }
}

export default CollectionManagerPlugin;
