import { IDocument } from '../../../../core/client/common/document';

export interface AdminCurrency extends IDocument {
  decimal: number;
  code: string;
  name: string;
  enableWallet: boolean;
  minWithdrawal: string;
  withdrawalFee: string;
  withdrawalConfirmations: string;
  depositConfirmations: string;
}
