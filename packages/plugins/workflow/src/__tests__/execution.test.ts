import { Application } from '@znewbee/server';
import Database from '@znewbee/database';
import { getApp } from '.';
import { BRANCH_INDEX, EXECUTION_STATUS, JOB_STATUS } from '../constants';



describe('execution', () => {
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

  describe('base', () => {
    it('empty workflow without any nodes', async () => {
      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.context.data.title).toEqual(post.title);
      expect(execution.status).toEqual(EXECUTION_STATUS.RESOLVED);
    });

    it('execute resolved workflow', async () => {
      await workflow.createNode({
        title: 'echo',
        type: 'echo'
      });

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.status).toEqual(EXECUTION_STATUS.RESOLVED);

      expect(execution.start()).rejects.toThrow();
      expect(execution.status).toEqual(EXECUTION_STATUS.RESOLVED);
      const jobs = await execution.getJobs();
      expect(jobs.length).toEqual(1);
    });

    it('workflow with single simple node', async () => {
      await workflow.createNode({
        title: 'echo',
        type: 'echo'
      });

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.context.data.title).toEqual(post.title);
      expect(execution.status).toEqual(EXECUTION_STATUS.RESOLVED);

      const jobs = await execution.getJobs();
      expect(jobs.length).toEqual(1);
      const { status, result } = jobs[0].get();
      expect(status).toEqual(JOB_STATUS.RESOLVED);
      expect(result).toMatchObject({ data: JSON.parse(JSON.stringify(post.toJSON())) });
    });

    it('workflow with multiple simple nodes', async () => {
      const n1 = await workflow.createNode({
        title: 'echo 1',
        type: 'echo'
      });

      const n2 = await workflow.createNode({
        title: 'echo 2',
        type: 'echo',
        upstreamId: n1.id
      });

      await n1.setDownstream(n2);

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.context.data.title).toEqual(post.title);
      expect(execution.status).toEqual(EXECUTION_STATUS.RESOLVED);

      const jobs = await execution.getJobs();
      expect(jobs.length).toEqual(2);
      const { status, result } = jobs[1].get();
      expect(status).toEqual(JOB_STATUS.RESOLVED);
      expect(result).toMatchObject({ data: JSON.parse(JSON.stringify(post.toJSON())) });
    });

    it('workflow with error node', async () => {
      await workflow.createNode({
        title: 'error',
        type: 'error'
      });

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.status).toEqual(EXECUTION_STATUS.REJECTED);

      const jobs = await execution.getJobs();
      expect(jobs.length).toEqual(1);
      const { status, result } = jobs[0].get();
      expect(status).toEqual(JOB_STATUS.REJECTED);
      expect(result.message).toBe('definite error');
    });
  });

  describe('manual nodes', () => {
    it('manual node should suspend execution, and could be manually resume', async () => {
      const n1 = await workflow.createNode({
        title: 'prompt',
        type: 'prompt',
      });

      const n2 = await workflow.createNode({
        title: 'echo',
        type: 'echo',
        upstreamId: n1.id
      });

      await n1.setDownstream(n2);

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.status).toEqual(EXECUTION_STATUS.STARTED);
      const [pending] = await execution.getJobs();
      expect(pending.status).toEqual(JOB_STATUS.PENDING);
      expect(pending.result).toEqual(null);

      pending.set('result', 123);
      await execution.resume(pending);
      expect(execution.status).toEqual(EXECUTION_STATUS.RESOLVED);

      const jobs = await execution.getJobs({ order: [['id', 'ASC']] });
      expect(jobs.length).toEqual(2);
      expect(jobs[0].status).toEqual(JOB_STATUS.RESOLVED);
      expect(jobs[0].result).toEqual(123);
      expect(jobs[1].status).toEqual(JOB_STATUS.RESOLVED);
      expect(jobs[1].result).toEqual(123);
    });

    it('manual node should suspend execution, resuming with error should end execution', async () => {
      const n1 = await workflow.createNode({
        title: 'prompt error',
        type: 'prompt->error',
      });
      const n2 = await workflow.createNode({
        title: 'echo',
        type: 'echo',
        upstreamId: n1.id
      });
      await n1.setDownstream(n2);

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.status).toEqual(EXECUTION_STATUS.STARTED);
      const [pending] = await execution.getJobs();
      expect(pending.status).toEqual(JOB_STATUS.PENDING);
      expect(pending.result).toEqual(null);

      pending.set('result', 123);
      await execution.resume(pending);
      expect(execution.status).toEqual(EXECUTION_STATUS.REJECTED);

      const jobs = await execution.getJobs();
      expect(jobs.length).toEqual(1);
      expect(jobs[0].status).toEqual(JOB_STATUS.REJECTED);
      expect(jobs[0].result.message).toEqual('input failed');
    });
  });

  describe('branch: condition', () => {
    it('condition node link to different downstreams', async () => {
      const n1 = await workflow.createNode({
        title: 'condition',
        type: 'condition',
        // no config means always true
      });

      const n2 = await workflow.createNode({
        title: 'true to echo',
        type: 'echo',
        branchIndex: BRANCH_INDEX.ON_TRUE,
        upstreamId: n1.id
      });

      await workflow.createNode({
        title: 'false to echo',
        type: 'echo',
        branchIndex: BRANCH_INDEX.ON_FALSE,
        upstreamId: n1.id
      });

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.status).toEqual(EXECUTION_STATUS.RESOLVED);

      const jobs = await execution.getJobs({ order: [['id', 'ASC']] });
      expect(jobs.length).toEqual(2);
      expect(jobs[0].nodeId).toEqual(n1.id);
      expect(jobs[1].nodeId).toEqual(n2.id);
      expect(jobs[1].result).toEqual(true);
    });

    it('suspend downstream in condition branch, then go on', async () => {
      const n1 = await workflow.createNode({
        title: 'condition',
        type: 'condition',
        // no config means always true
      });

      const n2 = await workflow.createNode({
        title: 'manual',
        type: 'prompt',
        branchIndex: BRANCH_INDEX.ON_TRUE,
        upstreamId: n1.id
      });

      const n3 = await workflow.createNode({
        title: 'echo input value',
        type: 'echo',
        upstreamId: n1.id
      });

      await n1.setDownstream(n3);

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.status).toEqual(EXECUTION_STATUS.STARTED);

      const [pending] = await execution.getJobs({ where: { nodeId: n2.id } });
      pending.set('result', 123);
      await execution.resume(pending);

      const jobs = await execution.getJobs();
      expect(jobs.length).toEqual(3);
    });

    it('resume error downstream in condition branch, should reject', async () => {
      const n1 = await workflow.createNode({
        title: 'condition',
        type: 'condition',
        // no config means always true
      });

      const n2 = await workflow.createNode({
        title: 'manual',
        type: 'prompt->error',
        branchIndex: BRANCH_INDEX.ON_TRUE,
        upstreamId: n1.id
      });

      const n3 = await workflow.createNode({
        title: 'echo input value',
        type: 'echo',
        upstreamId: n1.id
      });

      await n1.setDownstream(n3);

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.status).toEqual(EXECUTION_STATUS.STARTED);

      const [pending] = await execution.getJobs({ where: { nodeId: n2.id } });
      pending.set('result', 123);
      await execution.resume(pending);
      expect(execution.status).toEqual(EXECUTION_STATUS.REJECTED);

      const jobs = await execution.getJobs();
      expect(jobs.length).toEqual(2);
    });
  });

  describe('branch: parallel node', () => {
    it('link to single branch', async () => {
      const n1 = await workflow.createNode({
        title: 'parallel',
        type: 'parallel'
      });

      const n2 = await workflow.createNode({
        title: 'echo1',
        type: 'echo',
        upstreamId: n1.id,
        branchIndex: 0
      });

      const n3 = await workflow.createNode({
        title: 'echo2',
        type: 'echo',
        upstreamId: n1.id
      });

      await n1.setDownstream(n3);

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.status).toEqual(EXECUTION_STATUS.RESOLVED);
      const jobs = await execution.getJobs({ order: [['id', 'ASC']] });
      expect(jobs.length).toEqual(3);
    });

    it('link to multipe branches', async () => {
      const n1 = await workflow.createNode({
        title: 'parallel',
        type: 'parallel'
      });

      const n2 = await workflow.createNode({
        title: 'echo1',
        type: 'echo',
        upstreamId: n1.id,
        branchIndex: 0
      });

      const n3 = await workflow.createNode({
        title: 'echo2',
        type: 'echo',
        upstreamId: n1.id,
        branchIndex: 1
      });

      const n4 = await workflow.createNode({
        title: 'echo on end',
        type: 'echo',
        upstreamId: n1.id
      });

      await n1.setDownstream(n4);

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.status).toEqual(EXECUTION_STATUS.RESOLVED);
      const jobs = await execution.getJobs({ order: [['id', 'ASC']] });
      expect(jobs.length).toEqual(4);
    });

    it('downstream has manual node', async () => {
      const n1 = await workflow.createNode({
        title: 'parallel',
        type: 'parallel'
      });

      const n2 = await workflow.createNode({
        title: 'prompt',
        type: 'prompt',
        upstreamId: n1.id,
        branchIndex: 0
      });

      const n3 = await workflow.createNode({
        title: 'echo',
        type: 'echo',
        upstreamId: n1.id,
        branchIndex: 1
      });

      const n4 = await workflow.createNode({
        title: 'echo on end',
        type: 'echo',
        upstreamId: n1.id
      });

      await n1.setDownstream(n4);

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.status).toEqual(EXECUTION_STATUS.STARTED);

      const [pending] = await execution.getJobs({ where: { nodeId: n2.id } });
      pending.set('result', 123);
      await execution.resume(pending);

      expect(execution.status).toEqual(EXECUTION_STATUS.RESOLVED);
      const jobs = await execution.getJobs({ order: [['id', 'ASC']] });
      expect(jobs.length).toEqual(4);
    });
  });

  describe('branch: mixed', () => {
    it('condition branches contains parallel', async () => {
      const n1 = await workflow.createNode({
        title: 'condition',
        type: 'condition'
      });

      const n2 = await workflow.createNode({
        title: 'parallel',
        type: 'parallel',
        branchIndex: BRANCH_INDEX.ON_TRUE,
        upstreamId: n1.id
      });

      const n3 = await workflow.createNode({
        title: 'prompt',
        type: 'prompt',
        upstreamId: n2.id,
        branchIndex: 0
      });

      const n4 = await workflow.createNode({
        title: 'parallel echo',
        type: 'echo',
        upstreamId: n2.id,
        branchIndex: 1
      });

      const n5 = await workflow.createNode({
        title: 'last echo',
        type: 'echo',
        upstreamId: n1.id
      });

      await n1.setDownstream(n5);

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.status).toEqual(EXECUTION_STATUS.STARTED);

      const pendingJobs = await execution.getJobs();
      expect(pendingJobs.length).toBe(4);

      const pending = pendingJobs.find(item => item.nodeId === n3.id );
      pending.set('result', 123);
      await execution.resume(pending);

      expect(execution.status).toEqual(EXECUTION_STATUS.RESOLVED);
      const jobs = await execution.getJobs({ order: [['id', 'ASC']] });
      expect(jobs.length).toEqual(5);
    });

    it('parallel branches contains condition', async () => {
      const n1 = await workflow.createNode({
        title: 'parallel',
        type: 'parallel'
      });

      const n2 = await workflow.createNode({
        title: 'prompt',
        type: 'prompt',
        upstreamId: n1.id,
        branchIndex: 0
      });

      const n3 = await workflow.createNode({
        title: 'condition',
        type: 'condition',
        upstreamId: n1.id,
        branchIndex: 1
      });

      const n4 = await workflow.createNode({
        title: 'condition echo',
        type: 'echo',
        upstreamId: n3.id,
        branchIndex: BRANCH_INDEX.ON_TRUE
      });

      const n5 = await workflow.createNode({
        title: 'last echo',
        type: 'echo',
        upstreamId: n1.id
      });

      await n1.setDownstream(n5);

      const post = await PostRepo.create({ values: { title: 't1' } });

      const [execution] = await workflow.getExecutions();
      expect(execution.status).toEqual(EXECUTION_STATUS.STARTED);

      const pendingJobs = await execution.getJobs();
      expect(pendingJobs.length).toBe(4);

      const pending = pendingJobs.find(item => item.nodeId === n2.id );
      pending.set('result', 123);
      await execution.resume(pending);

      expect(execution.status).toEqual(EXECUTION_STATUS.RESOLVED);
      const jobs = await execution.getJobs({ order: [['id', 'ASC']] });
      expect(jobs.length).toEqual(5);
    });
  });

  describe('cycling trigger', () => {
    it('trigger should not be triggered more than once in same execution', async () => {
      const n1 = await workflow.createNode({
        type: 'create',
        config: {
          collection: 'posts',
          params: {
            values: {
              title: 't2'
            }
          }
        }
      });

      const post = await PostRepo.create({ values: { title: 't1' } });

      const posts = await PostRepo.find();
      expect(posts.length).toBe(2);

      const [execution] = await workflow.getExecutions();
      expect(execution.status).toBe(EXECUTION_STATUS.RESOLVED);
    });
  });
});
