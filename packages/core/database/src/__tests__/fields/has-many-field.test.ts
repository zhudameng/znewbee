import { Database } from '../../database';
import { mockDatabase } from '../';
import { makeWatchHost } from 'ts-loader/dist/servicesHost';

describe('has many field', () => {
  let db: Database;

  beforeEach(async () => {
    db = mockDatabase();
  });

  afterEach(async () => {
    await db.close();
  });

  it('association undefined', async () => {
    const collection = db.collection({
      name: 'posts',
      fields: [{ type: 'hasMany', name: 'comments' }],
    });
    await db.sync();
    expect(collection.model.associations['comments']).toBeUndefined();
  });

  it('association defined', async () => {
    const { model } = db.collection({
      name: 'posts',
      fields: [{ type: 'hasMany', name: 'comments' }],
    });
    expect(model.associations['comments']).toBeUndefined();
    const comments = db.collection({
      name: 'comments',
      fields: [{ type: 'string', name: 'content' }],
    });
    const association = model.associations.comments;
    expect(association).toBeDefined();
    expect(association.foreignKey).toBe('postId');
    // @ts-ignore
    expect(association.sourceKey).toBe('id');
    expect(comments.model.rawAttributes['postId']).toBeDefined();
    await db.sync();
    const post = await model.create<any>();
    await post.createComment({
      content: 'content111',
    });
    const postComments = await post.getComments();
    expect(postComments.map((comment) => comment.content)).toEqual(['content111']);
  });

  it('custom sourceKey', async () => {
    const collection = db.collection({
      name: 'posts',
      fields: [
        { type: 'string', name: 'key', unique: true },
        {
          type: 'hasMany',
          name: 'comments',
          sourceKey: 'key',
          // foreignKey: 'postKey',
        },
      ],
    });
    const comments = db.collection({
      name: 'comments',
      fields: [],
    });
    const association = collection.model.associations.comments;
    expect(association).toBeDefined();
    expect(association.foreignKey).toBe('postKey');
    // @ts-ignore
    expect(association.sourceKey).toBe('key');
    expect(comments.model.rawAttributes['postKey']).toBeDefined();
    await db.sync();
  });

  it('custom sourceKey and foreignKey', async () => {
    const collection = db.collection({
      name: 'posts',
      fields: [
        { type: 'string', name: 'key', unique: true },
        {
          type: 'hasMany',
          name: 'comments',
          sourceKey: 'key',
          foreignKey: 'postKey',
        },
      ],
    });
    const comments = db.collection({
      name: 'comments',
      fields: [],
    });
    const association = collection.model.associations.comments;
    expect(association).toBeDefined();
    expect(association.foreignKey).toBe('postKey');
    // @ts-ignore
    expect(association.sourceKey).toBe('key');
    expect(comments.model.rawAttributes['postKey']).toBeDefined();
    await db.sync();
  });

  it('custom name and target', async () => {
    const collection = db.collection({
      name: 'posts',
      fields: [
        { type: 'string', name: 'key', unique: true },
        {
          type: 'hasMany',
          name: 'reviews',
          target: 'comments',
          sourceKey: 'key',
          foreignKey: 'postKey',
        },
      ],
    });
    db.collection({
      name: 'comments',
      fields: [{ type: 'string', name: 'content' }],
    });
    const association = collection.model.associations.reviews;
    expect(association).toBeDefined();
    expect(association.foreignKey).toBe('postKey');
    // @ts-ignore
    expect(association.sourceKey).toBe('key');
    await db.sync();
    const post = await collection.model.create<any>({
      key: 'key1',
    });
    await post.createReview({
      content: 'content111',
    });
    const postComments = await post.getReviews();
    expect(postComments.map((comment) => comment.content)).toEqual(['content111']);
  });

  it('schema delete', async () => {
    const Post = db.collection({
      name: 'posts',
      fields: [{ type: 'hasMany', name: 'comments' }],
    });
    const Comment = db.collection({
      name: 'comments',
      fields: [{ type: 'belongsTo', name: 'post' }],
    });
    await db.sync();
    Post.removeField('comments');
    expect(Post.model.associations.comments).toBeUndefined();
    expect(Comment.model.rawAttributes.postId).toBeDefined();
    Comment.removeField('post');
    expect(Comment.model.rawAttributes.postId).toBeUndefined();
  });
});
