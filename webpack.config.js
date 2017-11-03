const fs = require('fs');
const path = require('path');

let appDir = path.join(__dirname, 'src/app');
const files = fs.readdirSync(appDir)
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

// console.log(files);

let configs = [];
files.forEach(file => {
  configs = configs.concat(require(file));
});

module.exports = configs;
