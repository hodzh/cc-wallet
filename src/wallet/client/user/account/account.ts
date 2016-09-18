import { IDocument } from "../../../../core/client/common/document";

export interface Account extends IDocument {
  fee: string;
  decimal: number;
  code: string;
  balance: string;
  currency: string;
}
