export const WITHDRAWAL_LIST_SCHEMA = [
  {
    title: 'owner',
    field: 'owner',
    //type: 'text'
  },
  {
    title: 'currency',
    field: 'currency',
    //type: 'text'
  },
  {
    title: 'create date',
    field: 'created',
    //type: 'text'
  },
  {
    title: 'update date',
    field: 'updated',
    //type: 'text'
  },
  {
    title: 'amount',
    field: 'amount',
    //type: 'text'
  },
  {
    title: 'actions',
    type: 'actions',
    actions: [{type: 'remove'}]
  }
];
