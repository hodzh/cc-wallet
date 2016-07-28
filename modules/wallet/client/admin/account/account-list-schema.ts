export const ADMIN_ACCOUNT_LIST_SCHEMA = [
  {
    title: 'create date',
    field: 'created'
  },
  {
    title: 'update date',
    field: 'updated'
  },
  {
    title: 'type',
    field: 'type'
  },
  {
    title: 'currency',
    field: 'currency'
  },
  {
    title: 'balance',
    field: 'balance'
  },
  {
    title: 'address',
    field: 'address'
  },
  {
    title: 'actions',
    type: 'actions',
    actions: [
      'remove',
      'refresh',
      {
        title: 'income'
      },
      {
        title: 'outcome'
      },
    ]
  }
];
