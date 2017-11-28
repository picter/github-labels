const ora = require('ora');
const chalk = require('chalk');
const syncRepo = require('./sync-repo');
const { loadRepos } = require('../github');

async function syncAllRepos(org, newLabels) {
  try {
    console.log(chalk.bold(org));
    const loadingSpinner = ora(`Loading respositories of ${org}`).start();
    const repos = await loadRepos(org);
    loadingSpinner.stop();
    console.log(chalk.blue(`Found ${repos.length} repos for ${org}. Starting to sync their labels...`))
    for(repo of repos) {
      await syncRepo(repo.full_name, newLabels);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = syncAllRepos;
