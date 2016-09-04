export const DEPOSIT_LIST_SCHEMA = [
  {
    title: 'owner',
    field: 'owner',
    //type: 'text'
  },
  {
    title: 'account',
    field: 'account',
    //type: 'text'
  },
  {
    title: 'currency',
    field: 'currency',
    //type: 'text'
  },
  {
    title: 'updated',
    field: 'updated',
    //type: 'text'
  },
  {
    title: 'actions',
    type: 'actions',
    actions: [{type: 'remove'}]
  }
];
