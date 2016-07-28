export const ACCOUNT_LIST_ACTIONS = [];

export const ACCOUNT_LIST_SCHEMA = [
  {
    title: 'code',
    field: 'currency'
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
    title: 'actions',
    type: 'actions',
    actions: ACCOUNT_LIST_ACTIONS
  }
];
