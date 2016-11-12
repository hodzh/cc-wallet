import { CURRENCY_TEXT_CONVERTER } from '../../../common/currency-text-converter';
export const ACCOUNT_LIST_ACTIONS = [];

export const ACCOUNT_LIST_SCHEMA = [
  {
    title: 'code',
    field: 'code'
  },
  {
    title: 'currency',
    field: 'currency'
  },
  {
    title: 'balance',
    field: 'balance',
    converter: CURRENCY_TEXT_CONVERTER
  },
  {
    title: 'actions',
    type: 'actions',
    actions: ACCOUNT_LIST_ACTIONS
  }
];
