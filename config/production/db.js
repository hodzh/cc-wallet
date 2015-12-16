module.exports = {
    host: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/walle-prod',

    /**
     * Database options that will be passed directly to mongoose.connect
     * Below are some examples.
     * See http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect-options
     * and http://mongoosejs.com/docs/connections.html for more information
     */
    options: {
        /*
         server: {
         socketOptions: {
         keepAlive: 1
         },
         poolSize: 5
         },
         replset: {
         rs_name: 'myReplicaSet',
         poolSize: 5
         },
         db: {
         w: 1,
         numberOfRetries: 2
         }
         */
    },
};