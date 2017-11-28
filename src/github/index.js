const axios = require('axios');
const parseLinkHeader = require('parse-link-header');
const config = require('../config');

async function loadLabels(repo) {
  const labels = [];
  let nextPage = `${config.apiUrl}/repos/${repo}/labels`;
  while (nextPage) {
    const response = await axios.get(
      nextPage,
      {
        headers: {
          Authorization: `bearer ${config.token}`,
        },
      },
    );
    const links = parseLinkHeader(response.headers.link)
    nextPage = links && links.next ? links.next.url : undefined;
    labels.push(...response.data);
  }
  return labels;
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