module.exports = {
  host: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/walle-dev'
};