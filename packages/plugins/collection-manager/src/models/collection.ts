import { SyncOptions, Transactionable } from 'sequelize';
import Database, { Collection, MagicAttributeModel } from '@znewbee/database';
import { FieldModel } from './field';

interface LoadOptions extends Transactionable {
  // TODO
  skipField?: boolean;
  skipExist?: boolean;
}

export class CollectionModel extends MagicAttributeModel {
  get db(): Database {
    return (<any>this.constructor).database;
  }

  async load(loadOptions: LoadOptions = {}) {
    const { skipExist, skipField, transaction } = loadOptions;
    const name = this.get('name');

    let collection: Collection;

    if (this.db.hasCollection(name)) {
      collection = this.db.getCollection(name);
      if (skipExist) {
        return collection;
      }
      collection.updateOptions({
        ...this.get(),
        fields: [],
      });
    } else {
      collection = this.db.collection({
        ...this.get(),
        fields: [],
      });
    }

    if (!skipField) {
      await this.loadFields({ transaction });
    }
    return collection;
  }

  async loadFields(options: Transactionable = {}) {
    // @ts-ignore
    const instances: FieldModel[] = await this.getFields(options);

    for (const instance of instances) {
      await instance.load(options);
    }
  }

  async migrate(options?: SyncOptions & Transactionable) {
    const collection = await this.load({
      transaction: options?.transaction,
    });
    await collection.sync({
      force: false,
      alter: {
        drop: false,
      },
      ...options,
    });
  }
}
