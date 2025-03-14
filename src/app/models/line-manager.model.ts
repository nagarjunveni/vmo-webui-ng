export enum LineManagerType {
  CSX_LINE_MANAGER = 'CSX_LINE_MANAGER',
  CSX_ESCALATION_MANAGER = 'CSX_ESCALATION_MANAGER',
  COMPNOVA_ESCALATION_MANAGER = 'COMPNOVA_ESCALATION_MANAGER'
}

export interface LineManager {
  id?: number;
  type: LineManagerType;
  department: string;
  status?: boolean;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  contactNumber: string;
  createdDate?: Date;
  updatedDate?: Date;
  typeDisplayName?: string;
}
