import { Position } from './position.model';

export enum PositionType {
  ONSITE = 'Onsite',
  OFFSHORE = 'Offshore',
}

export interface StatementOfWorkPosition {
  id?: number;
  statementOfWorkId?: number;
  positionId?: number;
  position?: Position;
  type?: PositionType;
  status?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
}
