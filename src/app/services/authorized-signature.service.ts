import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthorizedSignature } from '../models/authorized-signature.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedSignatureService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/authorized-signatures`;

  getAllSignatures(): Observable<AuthorizedSignature[]> {
    return this.http.get<AuthorizedSignature[]>(this.apiUrl);
  }

  getSignatureById(id: number): Observable<AuthorizedSignature> {
    return this.http.get<AuthorizedSignature>(`${this.apiUrl}/${id}`);
  }

  createSignature(formData: FormData): Observable<AuthorizedSignature> {
    return this.http.post<AuthorizedSignature>(this.apiUrl, formData);
  }

  updateSignature(id: number, formData: FormData): Observable<AuthorizedSignature> {
    return this.http.put<AuthorizedSignature>(`${this.apiUrl}/${id}`, formData);
  }

  deleteSignature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  downloadSignature(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/download`, { responseType: 'blob' });
  }
}
