"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCli = registerCli;

function registerCli(app) {
  require('./console').default(app);

  require('./db-auth').default(app);

  require('./db-clean').default(app);

  require('./db-sync').default(app);

  require('./install').default(app);

  require('./start').default(app);

  require('./upgrade').default(app); // development only with @znewbee/cli


  app.command('build').argument('[packages...]');
  app.command('clean');
  app.command('dev').usage('[options]').option('-p, --port [port]').option('--client').option('--server');
  app.command('doc').argument('[cmd]', '', 'dev');
  app.command('test').option('-c, --db-clean');
  app.command('umi');
}
