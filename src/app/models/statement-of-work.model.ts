import { AuthorizedSignature } from "./authorized-signature.model";
import { LineManager } from "./line-manager.model";
import { Milepost } from "./milepost.model";
import { StatementOfWorkPosition } from "./statement-of-work-position.model";
import { ActivitiesAndDeliverables } from './activities-and-deliverables.model';

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
  totalPositions?: number;
  projectScope?: string;
  teamsAndConditions?: string;
  assumptionsAndDependencies?: string;
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
  positions?: StatementOfWorkPosition[];
  mileposts? : Milepost[];
  activities?: ActivitiesAndDeliverables[];
}
