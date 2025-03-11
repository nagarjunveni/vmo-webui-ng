import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, AvatarModule, TagModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent {
  resources = [
    { 
      employeeId: 'EMP-1001', 
      name: 'John Doe', 
      role: 'Senior Developer', 
      location: 'New York', 
      department: 'Engineering',
      assignedSow: 'SOW-2024-001',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      status: 'Active'
    },
    { 
      employeeId: 'EMP-1002', 
      name: 'Jane Smith', 
      role: 'UX Designer', 
      location: 'San Francisco', 
      department: 'Design',
      assignedSow: 'SOW-2024-002',
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      status: 'Active'
    },
    { 
      employeeId: 'EMP-1003', 
      name: 'Michael Brown', 
      role: 'Project Manager', 
      location: 'Chicago', 
      department: 'Operations',
      assignedSow: 'SOW-2023-015',
      startDate: '2023-10-15',
      endDate: '2024-04-15',
      status: 'Notice Period'
    },
    { 
      employeeId: 'EMP-1004', 
      name: 'Emily Davis', 
      role: 'Data Scientist', 
      location: 'Boston', 
      department: 'Data Analytics',
      assignedSow: 'SOW-2024-003',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      status: 'Active'
    },
    { 
      employeeId: 'EMP-1005', 
      name: 'Robert Wilson', 
      role: 'DevOps Engineer', 
      location: 'Seattle', 
      department: 'Engineering',
      assignedSow: 'SOW-2023-012',
      startDate: '2023-09-01',
      endDate: '2024-03-31',
      status: 'Bench'
    },
    { 
      employeeId: 'EMP-1006', 
      name: 'Sarah Johnson', 
      role: 'QA Engineer', 
      location: 'Austin', 
      department: 'Quality Assurance',
      assignedSow: 'SOW-2024-002',
      startDate: '2024-02-15',
      endDate: '2024-12-31',
      status: 'Active'
    },
    { 
      employeeId: 'EMP-1007', 
      name: 'David Miller', 
      role: 'Frontend Developer', 
      location: 'Denver', 
      department: 'Engineering',
      assignedSow: 'SOW-2024-001',
      startDate: '2024-01-20',
      endDate: '2024-07-15',
      status: 'Active'
    }
  ];
  
  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | undefined {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Notice Period':
        return 'warn';
      case 'Bench':
        return 'info';
      default:
        return 'info';
    }
  }
} 