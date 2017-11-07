export = function(schema) {
  schema.add({
    updated: {
      type: Date,
      required: true
    },
  });
  schema.pre('validate', function (next) {
    this.updated = new Date();
    next();
  });
};
