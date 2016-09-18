import { AdminTransferComponent } from "./transfer.component";
import { CURRENCY_TEXT_CONVERTER } from "../../../common/currency-text-converter";
export const ADMIN_ACCOUNT_LIST_ACTIONS = [
  {type: 'remove'},
  {type: 'refresh'},
  {
    type: 'custom',
    factory: AdminTransferComponent,
    bind: 'account'
  }
];

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
    field: 'balance',
    converter: CURRENCY_TEXT_CONVERTER
  },
  {
    title: 'actions',
    type: 'actions',
    actions: ADMIN_ACCOUNT_LIST_ACTIONS
  }
];
