module.exports = {
  from: 'Jack Major <jackmajorgame@gmail.com>',
  mailer: {
    service: 'Gmail', // Gmail, SMTP
    auth: require('./email-auth')
  }
};