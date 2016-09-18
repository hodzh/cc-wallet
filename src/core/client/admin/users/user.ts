import { IDocument } from "../../common/document";
/**
 * user model for admin access
 */
export interface AdminUser extends IDocument {
  name?: string;
  email: string;
  role: string;
}
