import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LineManager, LineManagerType } from '../models/line-manager.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LineManagerService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/line-managers`;

  // Get all active line managers
  getAllLineManagers(): Observable<LineManager[]> {
    return this.http.get<LineManager[]>(this.apiUrl);
  }

  // Get line manager by ID
  getLineManagerById(id: number): Observable<LineManager> {
    return this.http.get<LineManager>(`${this.apiUrl}/${id}`);
  }

  // Get line managers by type
  getLineManagersByType(type: LineManagerType): Observable<LineManager[]> {
    return this.http.get<LineManager[]>(`${this.apiUrl}/type/${type}`);
  }

  // Create a new line manager
  createLineManager(lineManager: LineManager): Observable<LineManager> {
    return this.http.post<LineManager>(`${this.apiUrl}`, lineManager);
  }

  // Update an existing line manager
  updateLineManager(id: number, lineManager: LineManager): Observable<LineManager> {
    return this.http.put<LineManager>(`${this.apiUrl}/${id}`, lineManager);
  }

  // Soft delete a line manager
  deleteLineManager(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
