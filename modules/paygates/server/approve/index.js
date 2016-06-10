'use strict';

module.exports = function(withdrawal){
  // todo approvement
  setTimeout(function(){
    withdrawal.approve();
  }, 1000);
};
