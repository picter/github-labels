const os = require('os');
const config = require(`${os.homedir()}/.gl.json`);

module.exports = Object.assign({
  apiUrl: 'https://api.github.com',
}, config);
