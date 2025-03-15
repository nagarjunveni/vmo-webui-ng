import { AuthorizedSignature } from "./authorized-signature.model";
import { LineManager } from "./line-manager.model";

export interface StatementOfWork {
  id?: number;
  statementOfWorkId?: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  type: string;
  typeDisplayName?: string;
  projectState: string;
  projectStateDisplayName?: string;
  fixedBidAmount: number;
  lineManagerId?: number;
  lineManager?: LineManager;
  csxEscalationManagerId?: number;
  csxEscalationManager?: LineManager;
  compnovaEscalationManagerId?: number;
  compnovaEscalationManager?: LineManager;
  authorizedSignatureId?: number;
  authorizedSignature?: AuthorizedSignature;
  createdDate?: string;
  updatedDate?: string;
  status?: boolean;
}
