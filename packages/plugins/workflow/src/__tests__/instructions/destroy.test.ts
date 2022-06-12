import { Application } from '@znewbee/server';
import Database from '@znewbee/database';
import { getApp } from '..';



describe('workflow > instructions > destroy', () => {
  let app: Application;
  let db: Database;
  let PostRepo;
  let WorkflowModel;
  let workflow;

  beforeEach(async () => {
    app = await getApp();

    db = app.db;
    WorkflowModel = db.getCollection('workflows').model;
    PostRepo = db.getCollection('posts').repository;

    workflow = await WorkflowModel.create({
      title: 'test workflow',
      enabled: true,
      type: 'collection',
      config: {
        mode: 1,
        collection: 'posts'
      }
    });
  });

  afterEach(() => db.close());

  describe('destroy one', () => {
    it('params: from context', async () => {
      const n1 = await workflow.createNode({
        type: 'destroy',
        config: {
          collection: 'posts',
          params: {
            filter: {
              id: '{{$context.data.id}}'
            }
          }
        }
      });

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      const [job] = await execution.getJobs();
      expect(job.result).toBe(1);

      const count = await PostRepo.count();
      expect(count).toBe(0);
    });
  });
});
