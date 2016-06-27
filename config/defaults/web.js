module.exports = {

  hostname: process.env.HOST || process.env.HOSTNAME,

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
