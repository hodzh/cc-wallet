'use strict';

module.exports = {

  /**
   * user roles supported by application
   */
  role: ['applicant', 'user', 'admin', 'paygate'],

  /**
   * json web token settings
   */
  jwt: {
    secret: 'G5rT9pLnljwVvCdcmUlM6kiC097IGC0I5228kTjuqUxiACYvXJl7E42KYfcUEWf3',
    // expiresIn: 60 * 60 * 5 /* seconds */
    // expiresIn: 60 * 5 /* seconds */
    expiresIn: 99999999
  },

  /**
   * allow register new user
   */
  signup: true,

  /**
   * allow password reset by user
   */
  resetPassword: true,

  /**
   * auth request delay
   */
  delay: 500,

  /**
   * auth using email
   */
  local: {

    /**
     * enable email auth
     */
    enable: true,

    /**
     * validate user email by sending a token
     */
    verify: true
  },
};
