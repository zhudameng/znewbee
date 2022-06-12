import Application from '../application';

export default (app: Application) => {
  app
    .command('db:clean')
    .option('-y, --yes')
    .action(async (opts) => {
      console.log('Clearing database');
      await app.db.clean({
        drop: opts.yes,
      });
    });
};
