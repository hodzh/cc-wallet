import { DECIMAL_TEXT_CONVERTER } from '../../../common/decimal-text-converter';

export const TRANSACTION_LIST_SCHEMA = [
  {
    title: 'create date',
    field: 'created',
    sortable: 'both',
    sort: 'desc',
  },
  {
    title: 'update date',
    field: 'updated',
    sortable: 'both',
  },
  {
    title: 'status',
    field: 'status',
  },
  {
    title: 'state',
    field: 'state',
  },
  {
    title: 'category',
    field: 'category',
  },
  {
    title: 'currency',
    field: 'currency',
  },
  {
    title: 'amount',
    field: 'amount',
    sortable: 'both',
    converter: DECIMAL_TEXT_CONVERTER,
  },
  {
    title: 'actions',
    type: 'actions',
    actions: [
      {type: 'remove'},
      {type: 'refresh'},
    ],
  }
];
