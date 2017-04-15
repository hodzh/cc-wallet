export = function(schema) {
  schema.add({
    updated: {
      type: Date,
      require: true
    },
  });
  schema.pre('save', function (next) {
    this.updated = new Date();
    next();
  });
};
