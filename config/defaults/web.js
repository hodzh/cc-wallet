module.exports = {

    hostname: process.env.HOST || process.env.HOSTNAME,

    http: {
        port: process.env.PORT || 3000
    },
    https: {
        port: false,

        // Paths to key and cert as string
        ssl: {
            key: '',
            cert: ''
        }
    },

    session: {
        // The secret should be set to a non-guessable string that
        // is used to compute a session hash
        secret: 'G5rT9pLnljwVvCdcmUlM6kiC097IGC0I5228kTjuqUxiACYvXJl7E42KYfcUEWf3',

        // The name of the MongoDB collection to store sessions in
        collection: 'sessions',

        // The session cookie settings
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: null,

            // If secure is set to true then it will cause the cookie to be set
            // only when SSL-enabled (HTTPS) is used, and otherwise it won't
            // set a cookie. 'true' is recommended yet it requires the above
            // mentioned pre-requisite.
            secure: false
        },

        // The session cookie name
        name: 'connect.sid'
    },

    // Set bodyParser options
    bodyParser: {
        json: {
            limit: '100kb'
        },
        urlencoded: {
            limit: '100kb',
            extended: true
        }
    },

    templateEngine: 'swig'
};
