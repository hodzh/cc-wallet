import mongoose = require('mongoose');

mongoose.Types.Decimal128.prototype.negate = function () {
  const bytes = new Buffer(this.bytes);
  const byte = bytes[15];
  bytes[15] = (~byte & 128) | (byte & 127);
  return new mongoose.Types.Decimal128(bytes);
};
