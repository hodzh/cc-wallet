import { IDocument } from '../../../../core/client/common/document';
import { AdminCurrency } from '../currency/currency';

export interface AdminAccount extends IDocument {
  type: string;
  balance: string;
  currency: string;
  currencyInfo: AdminCurrency;
}
