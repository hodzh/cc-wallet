'use strict';

module.exports = setup;

function setup(userModel, config){
  // Passport Configuration
  require('./local/passport').setup(userModel, config);
  //require('./facebook/passport').setup(userModel, config);
  //require('./google/passport').setup(userModel, config);
  //require('./twitter/passport').setup(userModel, config);
}