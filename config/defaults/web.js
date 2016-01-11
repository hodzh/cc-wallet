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

  jwt: {
    secret: 'G5rT9pLnljwVvCdcmUlM6kiC097IGC0I5228kTjuqUxiACYvXJl7E42KYfcUEWf3',
    expiresIn: 60 * 60 * 5 /* seconds */,
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
