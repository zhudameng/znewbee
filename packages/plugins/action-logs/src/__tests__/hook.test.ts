import Database from '@znewbee/database';
import { mockServer, MockServer } from '@znewbee/test';
import logPlugin from '../server';

describe('hook', () => {
  let api: MockServer;
  let db: Database;

  beforeEach(async () => {
    api = mockServer();
    // api.plugin(require('@znewbee/plugin-users').default);
    api.plugin(logPlugin);
    await api.load();
    db = api.db;
    db.collection({
      name: 'posts',
      logging: true,
      fields: [
        {
          type: 'string',
          name: 'title',
        },
        {
          type: 'string',
          name: 'status',
          defaultValue: 'draft',
        },
      ],
    });
    db.collection({
      name: 'users',
      logging: false,
      fields: [
        { type: 'string', name: 'nickname' },
        { type: 'string', name: 'token' },
      ],
    });
    await db.sync();
  });

  afterEach(async () => {
    await api.destroy();
  });

  it('model', async () => {
    const Post = db.getCollection('posts').model;
    const post = await Post.create({ title: 't1' });
    await post.update({ title: 't2' });
    await post.destroy();
    const ActionLog = db.getCollection('action_logs').model;
    const count = await ActionLog.count();
    expect(count).toBe(3);
  });

  it('repository', async () => {
    const Post = db.getCollection('posts');
    const User = db.getCollection('users').model;
    const user = await User.create({ nickname: 'a', token: 'token1' });
    await Post.repository.create({
      values: { title: 't1' },
      context: {
        state: {
          currentUser: user,
        },
      },
    });
    const ActionLog = db.getCollection('action_logs');
    const log = await ActionLog.repository.findOne({
      appends: ['changes'],
    });
    expect(log.toJSON()).toMatchObject({
      collectionName: 'posts',
      type: 'create',
      userId: 1,
      changes: [
        {
          field: {
            name: 'title',
            type: 'string',
          },
          before: null,
          after: 't1',
        },
      ],
    });
  });

  it.skip('resource', async () => {
    const agent = api.agent();
    agent.set('Authorization', `Bearer token1`);
    const response = await agent.resource('posts').create({
      values: { title: 't1' },
    });
    await agent.resource('posts').update({
      resourceIndex: response.body.data.id,
      values: { title: 't2' },
    });
    await agent.resource('posts').destroy({
      resourceIndex: response.body.data.id,
    });
    const ActionLog = db.getCollection('action_logs').model;
    const count = await ActionLog.count();
    expect(count).toBe(3);
  });
});
