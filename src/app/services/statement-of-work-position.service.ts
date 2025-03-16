import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StatementOfWorkPosition } from '../models/statement-of-work-position.model';

@Injectable({
  providedIn: 'root'
})
export class StatementOfWorkPositionService {
  private apiUrl = `${environment.apiUrl}/statement-of-work-positions`;

  constructor(private http: HttpClient) { }

  getPositionsByStatementOfWorkId(statementOfWorkId: number): Observable<StatementOfWorkPosition[]> {
    return this.http.get<StatementOfWorkPosition[]>(`${this.apiUrl}/sow/${statementOfWorkId}`);
  }

  createStatementOfWorkPosition(sowPosition: StatementOfWorkPosition): Observable<StatementOfWorkPosition> {
    return this.http.post<StatementOfWorkPosition>(this.apiUrl, sowPosition);
  }

  updateStatementOfWorkPosition(id: number, sowPosition: StatementOfWorkPosition): Observable<StatementOfWorkPosition> {
    return this.http.put<StatementOfWorkPosition>(`${this.apiUrl}/${id}`, sowPosition);
  }

  deleteStatementOfWorkPosition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Bulk operations for creating multiple positions at once
  createBulkStatementOfWorkPositions(sowPositions: StatementOfWorkPosition[]): Observable<StatementOfWorkPosition[]> {
    return this.http.post<StatementOfWorkPosition[]>(`${this.apiUrl}/bulk`, sowPositions);
  }
}
