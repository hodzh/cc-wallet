import { IDocument } from '../../../core/client/common/document';

export interface Currency extends IDocument {
  fee: string;
  decimal: number;
  code: string;
  name: string;
}
