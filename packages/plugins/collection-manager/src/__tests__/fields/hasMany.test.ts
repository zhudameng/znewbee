import Database, { Collection as DBCollection } from '@znewbee/database';
import Application from '@znewbee/server';
import { createApp } from '..';

describe('hasMany field options', () => {
  let db: Database;
  let app: Application;
  let Collection: DBCollection;
  let Field: DBCollection;

  beforeEach(async () => {
    app = await createApp();
    await app.db.sync();
    db = app.db;
    Collection = db.getCollection('collections');
    Field = db.getCollection('fields');
    await Collection.repository.create({
      values: {
        name: 'tests',
      },
    });
    await Collection.repository.create({
      values: {
        name: 'foos',
      },
    });
  });

  afterEach(async () => {
    await app.destroy();
  });

  it('should generate the foreignKey randomly', async () => {
    const field = await Field.repository.create({
      values: {
        type: 'hasMany',
        collectionName: 'tests',
        target: 'foos',
      },
    });
    await field.reload();
    const json = field.toJSON();
    expect(json).toMatchObject({
      type: 'hasMany',
      collectionName: 'tests',
      target: 'foos',
      sourceKey: 'id',
      targetKey: 'id',
    });
    expect(json.name).toBeDefined();
    expect(json.foreignKey).toBeDefined();
  });

  it('the parameters are not generated randomly', async () => {
    const field = await Field.repository.create({
      values: {
        name: 'foos',
        type: 'hasMany',
        collectionName: 'tests',
        target: 'foos',
        sourceKey: 'abc',
        foreignKey: 'def',
        targetKey: 'ghi',
      },
    });
    await field.reload();
    expect(field.toJSON()).toMatchObject({
      name: 'foos',
      type: 'hasMany',
      collectionName: 'tests',
      target: 'foos',
      sourceKey: 'abc',
      foreignKey: 'def',
      targetKey: 'ghi',
    });
  });
});
