const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');
const syncRepo = require('./commands/sync-repo');
const syncAllRepos = require('./commands/sync-all-repos');

const argv = yargs
  .usage('gl [command]')
  .command(
    'sync [target]',
    'Sync labels of specified organisation / repository.',
    yargs => yargs.options({
      'labels': {
        alias: 'l',
        describe: 'a path to a json-file that specifies a desired set of labels',
      },
    }),
  )
  .help().argv;

const main = async () => {
  const command = argv._[0];
  if (command !== 'sync') {
    console.log(chalk.red(`${command} is an invalid command`));
    process.exit();
  }
  if(argv.target.match(/\//)) {
    return syncRepo(argv.target, labels);
  }

  return syncAllRepos(argv.target, labels)
};

main();