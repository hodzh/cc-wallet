export = function(schema) {
  schema.add({
    created: {
      type: Date,
      require: true
    },
  });
  schema.pre('save', function (next) {
    if (this.isNew) {
      this.created = new Date();
    }
    next();
  });
};
