import { TableSchema } from '../../../../core/client/components/grid/table-scheme';

export const WITHDRAWAL_LIST_SCHEMA: TableSchema = [
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
    title: 'status',
    field: 'status',
    //type: 'text'
  },
  {
    title: 'amount',
    field: 'amount',
    //type: 'text'
  },
  {
    title: 'fee',
    field: 'fee',
    //type: 'text'
  },
  {
    title: 'actions',
    type: 'actions',
    actions: [{type: 'remove'}]
  }
];
