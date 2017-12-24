import { DECIMAL_TEXT_CONVERTER } from '../../../common/decimal-text-converter';
export const ACCOUNT_LIST_ACTIONS = [];

export const ACCOUNT_LIST_SCHEMA = [
  {
    title: 'Coin',
    field: 'currency',
  },
  {
    title: 'Name',
    field: 'currencyName',
  },
  {
    title: 'Balance',
    field: 'balance',
    converter: DECIMAL_TEXT_CONVERTER,
  },
  {
    title: 'Actions',
    type: 'actions',
    actions: ACCOUNT_LIST_ACTIONS,
  }
];
