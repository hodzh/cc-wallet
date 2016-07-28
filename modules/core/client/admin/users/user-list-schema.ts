export const USER_LIST_SCHEMA = [
  {
    title: 'Email',
    field: 'email',
    //type: 'email'
  },
  {
    title: 'Name',
    field: 'name',
    //type: 'text'
  },
  {
    title: 'Role',
    field: 'role',
    //type: 'options',
    options: [
      'user',
      'admin'
    ]
  },
  {
    title: 'actions',
    type: 'actions',
    actions: ['remove']
  }
];
