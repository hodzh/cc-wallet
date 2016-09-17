module.exports = {
  users: [
    {
      provider: 'local',
      role: 'admin',
      email: 'admin@admin.admin',
      emailValid: true,
      password: 'admin'
    },
    {
      provider: 'local',
      email: 'user@user.user',
      emailValid: true,
      password: 'user'
    },
    {
      provider: 'local',
      email: 'ehodzh@gmail.com',
      emailValid: true,
      password: 'user'
    },
    {
      email: 'bitcoin@paygate.cc',
      password: 'admin',
      role: 'paygate',
      provider: 'local',
      emailValid: true,
    }
  ]
};
