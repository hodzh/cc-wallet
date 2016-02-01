module.exports = {
    name : "email"
};

module.exports.attach = function(callback){
    var api = this;
    var email = require("./email");
    api.email = new email(api);
    callback();
};
