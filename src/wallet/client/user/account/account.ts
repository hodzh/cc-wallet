import { IDocument } from '../../../../core/client/common/document';
import { IDecimal } from '../../../common/decimal';

export interface Account extends IDocument {
  balance: IDecimal;
  currency: string;
  currencyName: string;
  decimal: number;
  withdrawalFee: IDecimal;
}
