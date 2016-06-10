'use strict';

module.exports = function(withdrawal){
  // todo SFA
  setTimeout(function(){
    withdrawal.confirm();
  }, 1000);
};
