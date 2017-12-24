import { IDocument } from '../../../core/client/common/document';
import { IDecimal } from '../../common/decimal';

export interface Currency extends IDocument {
  withdrawalFee: IDecimal;
  decimal: number;
  code: string;
  name: string;
}
