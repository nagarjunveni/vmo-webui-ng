import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from '../models/vendor.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/vendors`; // Update with your actual API URL

  // Get all active vendors
  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.apiUrl}`);
  }

  // Get vendor by ID
  getVendorById(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/${id}`);
  }

  // Get vendor by employee identification number
  getVendorByEIN(ein: string): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/ein/${ein}`);
  }

  // Search vendors by name
  searchVendorsByName(name: string): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.apiUrl}/search?name=${name}`);
  }

  // Create a new vendor
  createVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.apiUrl}`, vendor);
  }

  // Update an existing vendor
  updateVendor(id: number, vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.apiUrl}/${id}`, vendor);
  }

  // Soft delete a vendor
  deleteVendor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
