import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, RatingModule, FormsModule, TagModule],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.scss'
})
export class VendorsComponent {
  vendors = [
    { 
      vendorId: 'VEN-001', 
      vendorName: 'TechSolutions Inc.', 
      contactName: 'John Smith', 
      contactNumber: '+1 (212) 555-1234', 
      email: 'john.smith@techsolutions.com',
      commission: 8.5,
      location: 'New York, USA',
      status: 'Active',
      rating: 4
    },
    { 
      vendorId: 'VEN-002', 
      vendorName: 'Global IT Services', 
      contactName: 'Maria Rodriguez', 
      contactNumber: '+1 (415) 555-6789', 
      email: 'maria@globalitservices.com',
      commission: 7.0,
      location: 'San Francisco, USA',
      status: 'Active',
      rating: 5
    },
    { 
      vendorId: 'VEN-003', 
      vendorName: 'Innovative Solutions', 
      contactName: 'Robert Johnson', 
      contactNumber: '+1 (312) 555-4321', 
      email: 'robert@innovativesolutions.com',
      commission: 8.0,
      location: 'Chicago, USA',
      status: 'Active',
      rating: 3
    },
    { 
      vendorId: 'VEN-004', 
      vendorName: 'DataTech Systems', 
      contactName: 'Sarah Williams', 
      contactNumber: '+1 (617) 555-8765', 
      email: 'sarah@datatechsystems.com',
      commission: 7.5,
      location: 'Boston, USA',
      status: 'Inactive',
      rating: 4
    },
    { 
      vendorId: 'VEN-005', 
      vendorName: 'NextGen Consulting', 
      contactName: 'Michael Brown', 
      contactNumber: '+1 (206) 555-9876', 
      email: 'michael@nextgenconsulting.com',
      commission: 9.0,
      location: 'Seattle, USA',
      status: 'Active',
      rating: 5
    },
    { 
      vendorId: 'VEN-006', 
      vendorName: 'Tech Talent Solutions', 
      contactName: 'Jennifer Davis', 
      contactNumber: '+1 (512) 555-2345', 
      email: 'jennifer@techtalentsolutions.com',
      commission: 8.0,
      location: 'Austin, USA',
      status: 'Active',
      rating: 4
    },
    { 
      vendorId: 'VEN-007', 
      vendorName: 'Digital Workforce', 
      contactName: 'David Miller', 
      contactNumber: '+1 (303) 555-3456', 
      email: 'david@digitalworkforce.com',
      commission: 7.0,
      location: 'Denver, USA',
      status: 'Inactive',
      rating: 3
    }
  ];
  
  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | undefined {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'danger';
      default:
        return 'info';
    }
  }
} 