const fs = require('fs');
const path = require('path');
const exclude = [
  'sample',
];
const include = [
  'cc-market',
  'cc-bitcoind',
];
const appDir = path.join(__dirname, 'src/app');
const files = fs.readdirSync(appDir)
  .filter(dir => !include.length || include.includes(dir))
  .filter(dir => !exclude.length || !exclude.includes(dir))
  .map(dir => path.join(appDir, dir, 'webpack.config.js'))
  .filter(file => {
    // console.log(file);
    try {
      const stats = fs.statSync(file);
      if (stats.isFile()) {
        return true;
      }
    } catch (error) {
    }
    return false;
  });

console.log(files);

let configs = [];
files.forEach(file => {
  configs = configs.concat(require(file));
});

module.exports = configs;
