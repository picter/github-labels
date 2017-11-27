const axios = require('axios');
const config = require('../config');

async function loadLabels(repo) {
  const labels = await axios.get(
    `${config.apiUrl}/repos/${repo}/labels`,
    {
      headers: {
        Authorization: `bearer ${config.token}`,
      },
    },
  );
  return labels.data;
}

module.exports = { loadLabels };