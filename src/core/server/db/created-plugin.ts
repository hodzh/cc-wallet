export = function(schema) {
  schema.add({
    created: {
      type: Date,
      required: true
    },
  });
  schema.pre('validate', function (next) {
    if (this.isNew) {
      this.created = new Date();
    }
    next();
  });
};
