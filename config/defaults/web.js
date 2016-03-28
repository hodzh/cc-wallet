module.exports = {

  hostname: process.env.HOST || process.env.HOSTNAME,

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
