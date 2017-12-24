import { DECIMAL_TEXT_CONVERTER } from '../../../common/decimal-text-converter';

export const ADMIN_CURRENCY_LIST_ACTIONS = [
  {type: 'refresh'},
  {type: 'remove'},
];

export const ADMIN_CURRENCY_LIST_SCHEMA = [
  {
    title: 'enableWallet',
    field: 'enableWallet',
    type: 'bool',
  },  {
    title: 'create date',
    field: 'created',
  },
  {
    title: 'update date',
    field: 'updated',
  },
  {
    title: 'name',
    field: 'name',
    type: 'text',
  },
  {
    title: 'code',
    field: 'code',
    type: 'text',
  },
  {
    title: 'decimal',
    field: 'decimal',
    type: 'text',
  },
  {
    title: 'minWithdrawal',
    field: 'minWithdrawal',
    type: 'text',
    converter: DECIMAL_TEXT_CONVERTER,
  },
  {
    title: 'withdrawalFee',
    field: 'withdrawalFee',
    type: 'text',
    converter: DECIMAL_TEXT_CONVERTER,
  },
  {
    title: 'withdrawalConfirmations',
    field: 'withdrawalConfirmations',
    type: 'text',
  },
  {
    title: 'depositConfirmations',
    field: 'depositConfirmations',
    type: 'text',
  },
  {
    title: 'actions',
    type: 'actions',
    actions: ADMIN_CURRENCY_LIST_ACTIONS,
  }
];
