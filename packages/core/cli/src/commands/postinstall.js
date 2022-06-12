const { Command } = require('commander');
const { run, isDev } = require('../util');
const { resolve } = require('path');
const { existsSync } = require('fs');
const { readFile, writeFile } = require('fs').promises;

/**
 * @param {Command} cli
 */
module.exports = (cli) => {
  const { APP_PACKAGE_ROOT } = process.env;
  cli
    .command('postinstall')
    .allowUnknownOption()
    .action(async () => {
      if (!isDev()) {
        return;
      }
      const cwd = process.cwd();
      if (!existsSync(resolve(cwd, '.env')) && existsSync(resolve(cwd, '.env.example'))) {
        const content = await readFile(resolve(cwd, '.env.example'), 'utf-8');
        await writeFile(resolve(cwd, '.env'), content, 'utf-8');
      }
      run('umi', ['generate', 'tmp'], {
        stdio: 'pipe',
        env: {
          APP_ROOT: `packages/${APP_PACKAGE_ROOT}/client`,
        },
      });
    });
};
