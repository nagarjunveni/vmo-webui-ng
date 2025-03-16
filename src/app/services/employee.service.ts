import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    // Convert the employee object to match the API's expected format
    const employeeRequest = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      middleName: employee.middleName || '',
      contactNumber: employee.contactNumber,
      email: employee.email,
      vendorId: employee.vendorId,
      profilePicture: employee.profileImage, // Use the base64 string directly
      dateOfBirth: employee.dateOfBirth,
      gender: employee.gender,
      workLocation: employee.workLocation,
      employmentType: employee.employmentType,
      isFreelancer: employee.isFreelancer,
      department: employee.department || '',
      employmentStatus: employee.employmentStatus,
      startDate: employee.startDate,
      location: employee.location || '',
      status: employee.status
    };

    return this.http.post<Employee>(this.apiUrl, employeeRequest);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    // Convert the employee object to match the API's expected format
    const employeeRequest = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      middleName: employee.middleName || '',
      contactNumber: employee.contactNumber,
      email: employee.email,
      vendorId: employee.vendorId,
      profilePicture: employee.profileImage, // Use the base64 string directly
      dateOfBirth: employee.dateOfBirth,
      gender: employee.gender,
      workLocation: employee.workLocation,
      employmentType: employee.employmentType,
      isFreelancer: employee.isFreelancer,
      department: employee.department || '',
      employmentStatus: employee.employmentStatus,
      startDate: employee.startDate,
      location: employee.location || '',
      status: employee.status
    };

    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employeeRequest);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
