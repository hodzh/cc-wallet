import { IDocument } from '../../../../core/client/common/document';

export interface AdminAccount extends IDocument {
  fee: string;
  balance: string;
  currency: string;
  decimal: number;
  code: string;
}
