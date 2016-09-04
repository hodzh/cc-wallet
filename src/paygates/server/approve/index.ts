'use strict';

export = function (withdrawal) {
  // todo approvement
  setTimeout(function () {
    withdrawal.approve();
  }, 1000);
};
