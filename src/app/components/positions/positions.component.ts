import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, TagModule, AvatarModule],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss'
})
export class PositionsComponent {
  positions = [
    { 
      positionId: 'POS-001', 
      positionName: 'Senior Angular Developer', 
      sow: 'SOW-2024-001', 
      department: 'Engineering', 
      location: 'New York',
      rate: 85,
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      status: 'Filled',
      assignedResource: 'John Doe'
    },
    { 
      positionId: 'POS-002', 
      positionName: 'UX Designer', 
      sow: 'SOW-2024-002', 
      department: 'Design', 
      location: 'Remote',
      rate: 75,
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      status: 'Filled',
      assignedResource: 'Jane Smith'
    },
    { 
      positionId: 'POS-003', 
      positionName: 'Project Manager', 
      sow: 'SOW-2023-015', 
      department: 'Operations', 
      location: 'Chicago',
      rate: 95,
      startDate: '2023-10-15',
      endDate: '2024-04-15',
      status: 'Filled',
      assignedResource: 'Michael Brown'
    },
    { 
      positionId: 'POS-004', 
      positionName: 'Data Scientist', 
      sow: 'SOW-2024-003', 
      department: 'Data Analytics', 
      location: 'Boston',
      rate: 90,
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      status: 'Filled',
      assignedResource: 'Emily Davis'
    },
    { 
      positionId: 'POS-005', 
      positionName: 'DevOps Engineer', 
      sow: 'SOW-2023-012', 
      department: 'Engineering', 
      location: 'Seattle',
      rate: 80,
      startDate: '2023-09-01',
      endDate: '2024-03-31',
      status: 'Open',
      assignedResource: ''
    },
    { 
      positionId: 'POS-006', 
      positionName: 'QA Engineer', 
      sow: 'SOW-2024-002', 
      department: 'Quality Assurance', 
      location: 'Austin',
      rate: 70,
      startDate: '2024-02-15',
      endDate: '2024-12-31',
      status: 'Filled',
      assignedResource: 'Sarah Johnson'
    },
    { 
      positionId: 'POS-007', 
      positionName: 'Frontend Developer', 
      sow: 'SOW-2024-001', 
      department: 'Engineering', 
      location: 'Denver',
      rate: 75,
      startDate: '2024-01-20',
      endDate: '2024-07-15',
      status: 'Filled',
      assignedResource: 'David Miller'
    },
    { 
      positionId: 'POS-008', 
      positionName: 'Backend Developer', 
      sow: 'SOW-2024-001', 
      department: 'Engineering', 
      location: 'New York',
      rate: 80,
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      status: 'Open',
      assignedResource: ''
    }
  ];
  
  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | undefined {
    switch (status) {
      case 'Filled':
        return 'success';
      case 'Open':
        return 'info';
      case 'On Hold':
        return 'warn';
      case 'Cancelled':
        return 'danger';
      default:
        return 'info';
    }
  }
  
  formatCurrency(rate: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rate);
  }
} 