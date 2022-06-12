import { Database } from '@znewbee/database';
import { mockServer, MockServer } from '@znewbee/test';
import CollectionManagerPlugin from '@znewbee/plugin-collection-manager';
import { UiSchemaStoragePlugin } from '@znewbee/plugin-ui-schema-storage';

describe('action test', () => {
  let db: Database;
  let app: MockServer;

  beforeEach(async () => {
    app = mockServer();
    app.plugin(CollectionManagerPlugin);
    app.plugin(UiSchemaStoragePlugin);

    db = app.db;
    await db.clean({ drop: true });
    await app.loadAndInstall();
  });

  afterEach(async () => {
    await app.destroy();
  });
  it('should append uiSchema', async () => {
    await db.getRepository('collections').create({
      values: {
        name: 'posts',
      },
    });

    await db.getRepository('fields').create({
      values: {
        name: 'title',
        collectionName: 'posts',
        type: 'string',
        uiSchema: {
          'x-uid': 'test',
        },
      },
    });

    // @ts-ignore
    await db.getRepository('collections').load();
    await db.sync();

    const response = await app
      .agent()
      .resource('collections.fields', 'posts')
      .list({
        pageSize: 5,
        appends: ['uiSchema'],
        sort: ['sort'],
      });

    expect(response.statusCode).toEqual(200);
  });
});
