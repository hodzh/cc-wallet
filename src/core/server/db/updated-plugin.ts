export = function(schema) {
  schema.pre('save', function (next) {
    schema.add({
      updated: {
        type: Date,
        require: true
      },
    });
    this.updated = new Date();
    next();
  });
};
