const ora = require('ora');
const chalk = require('chalk');
const getLabelDiff = require('../helpers/get-label-diff');
const { loadLabels, addLabel, updateLabel } = require('../github');

async function updateLabels(repo, newLabels) {
  try {
    console.log(chalk.bold(repo));
    const loadingSpinner = ora(`Loading labels of ${repo}`).start();
    const existingLabels = await loadLabels(repo);
    loadingSpinner.stop();
    
    const labelDiff = getLabelDiff(existingLabels, newLabels);
  
    // add new labels
    const createSpinner = ora(`Add ${labelDiff.add.length} new labels`).start();
    await Promise.all(labelDiff.add.map(label => addLabel(repo, label)));
    createSpinner.succeed();

    // update existing labels
    const updateSpinner = ora(`Update ${labelDiff.update.length} changed labels`).start();
    await Promise.all(labelDiff.update.map(label => updateLabel(label)));
    updateSpinner.succeed();
  } catch (error) {
    console.error(error);
  }
}

module.exports = updateLabels;