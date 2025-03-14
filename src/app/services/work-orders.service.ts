import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { StatementOfWork } from '../models/statement-of-work.model';

@Injectable({
  providedIn: 'root'
})
export class WorkOrdersService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/statement-of-works`;
  constructor() { }

  getWorkOrders(): Observable<StatementOfWork[]> {
    return this.http.get<StatementOfWork[]>(`${this.apiUrl}`);
  }

  getWorkOrderById(id: number): Observable<StatementOfWork> {
    return this.http.get<StatementOfWork>(`${this.apiUrl}/${id}`);
  }

  createWorkOrder(workOrder: StatementOfWork): Observable<StatementOfWork> {
    return this.http.post<StatementOfWork>(`${this.apiUrl}`, workOrder);
  }

  updateWorkOrder(id: number, workOrder: StatementOfWork): Observable<StatementOfWork> {
    return this.http.put<StatementOfWork>(`${this.apiUrl}/${id}`, workOrder);
  }

  deleteWorkOrder(id: number): Observable<StatementOfWork>{
    return this.http.delete<StatementOfWork>(`${this.apiUrl}/${id}`);
  }
}


