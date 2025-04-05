import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Milepost } from '../models/milepost.model';

@Injectable({
  providedIn: 'root'
})
export class MilepostService {

  private http = inject(HttpClient);
  private apiURL = `${environment.apiUrl}/mileposts`;

  constructor() { }

  getMilepostsBySOWId(sowId: number) {
    return this.http.get<Milepost[]>(`${this.apiURL}?sowId=${sowId}`)
  }

  createMilepost(milepost: Milepost) {
    return this.http.post<Milepost>(this.apiURL, milepost);
  }

  updateMilepost(milepostId: number, milepost: Milepost) {
    return this.http.put<Milepost>(`${this.apiURL}/${milepostId}`, milepost);
  }

  deleteMilepost(milepostId: number) {
    return this.http.delete<void>(`${this.apiURL}/${milepostId}`);
  }
}
