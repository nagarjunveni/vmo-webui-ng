import { AuthorizedSignature } from "./authorized-signature.model";
import { LineManager } from "./line-manager.model";

export interface StatementOfWork {
  id?: number;
  statementOfWorkId?: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  type: string;
  typeDisplayName?: string;
  projectState: string;
  projectStateDisplayName?: string;
  fixedBidAmount: number;
  lineManagerId?: number;
  lineManager?: LineManager;
  escalationManagerId?: number;
  escalationManager?: LineManager;
  compnovaEscalationManagerId?: number;
  compnovaEscalationManager?: LineManager;
  authorizedSignatureId?: number;
  authorizedSignature?: AuthorizedSignature;
  createdDate?: Date;
  updatedDate?: Date;
  status?: boolean;
}