'use strict';

module.exports = {
  /**
   * user roles supported by application
   */
  role: ['user', 'admin', 'paygate'],

  /**
   * json web token settings
   */
  jwt: {
    secret: 'G5rT9pLnljwVvCdcmUlM6kiC097IGC0I5228kTjuqUxiACYvXJl7E42KYfcUEWf3',
    expiresIn: 60 * 60 * 5 /* seconds */
  },

  /**
   * redirect
   */
  // landingPage: '/',

  /**
   * auth using email
   */
  local: {
    /**
     * enable email auth
     */
    enabled: true,
    /**
     * validate user email by sending a token
     */
    verify: true
  },

  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    enabled: false
  },
  twitter: {
    clientID: 'CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
    enabled: false
  },
  github: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/github/callback',
    enabled: false
  },
  google: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    enabled: false
  },
  linkedin: {
    clientID: 'API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback',
    enabled: false
  }
};