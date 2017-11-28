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

async function addLabel(repo, { name, color }) {
  const labels = await axios.post(
    `${config.apiUrl}/repos/${repo}/labels`,
    { name, color },
    {
      headers: {
        Authorization: `bearer ${config.token}`,
      },
    },
  );
  return labels.data;
}

async function updateLabel({ url, name, color }) {
  const labels = await axios.patch(
    url,
    { name, color },
    {
      headers: {
        Authorization: `bearer ${config.token}`,
      },
    },
  );
  return labels.data;
}

module.exports = { loadLabels, addLabel, updateLabel };