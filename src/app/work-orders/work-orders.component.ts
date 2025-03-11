import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-work-orders',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, TagModule],
  templateUrl: './work-orders.component.html',
  styleUrl: './work-orders.component.scss'
})
export class WorkOrdersComponent {
  workOrders = [
    { 
      sowId: 'SOW-2024-001', 
      sowName: 'Cloud Migration Project', 
      lineManager: 'John Smith',
      startDate: '2024-01-15', 
      endDate: '2024-07-15', 
      status: 'Active',
      totalPositions: 12,
      onsitePositions: 4,
      offshorePositions: 8,
      onsiteAmount: 480000,
      offshoreAmount: 320000,
      grandTotal: 800000
    },
    { 
      sowId: 'SOW-2024-002', 
      sowName: 'ERP Implementation', 
      lineManager: 'Sarah Johnson',
      startDate: '2024-02-01', 
      endDate: '2024-12-31', 
      status: 'Active',
      totalPositions: 18,
      onsitePositions: 6,
      offshorePositions: 12,
      onsiteAmount: 720000,
      offshoreAmount: 480000,
      grandTotal: 1200000
    },
    { 
      sowId: 'SOW-2023-015', 
      sowName: 'Mobile App Development', 
      lineManager: 'Michael Brown',
      startDate: '2023-10-15', 
      endDate: '2024-04-15', 
      status: 'Closing',
      totalPositions: 8,
      onsitePositions: 2,
      offshorePositions: 6,
      onsiteAmount: 240000,
      offshoreAmount: 240000,
      grandTotal: 480000
    },
    { 
      sowId: 'SOW-2024-003', 
      sowName: 'Data Analytics Platform', 
      lineManager: 'Emily Davis',
      startDate: '2024-03-01', 
      endDate: '2025-02-28', 
      status: 'Active',
      totalPositions: 15,
      onsitePositions: 5,
      offshorePositions: 10,
      onsiteAmount: 600000,
      offshoreAmount: 400000,
      grandTotal: 1000000
    },
    { 
      sowId: 'SOW-2023-012', 
      sowName: 'Security Compliance Upgrade', 
      lineManager: 'Robert Wilson',
      startDate: '2023-09-01', 
      endDate: '2024-03-31', 
      status: 'Completed',
      totalPositions: 6,
      onsitePositions: 2,
      offshorePositions: 4,
      onsiteAmount: 240000,
      offshoreAmount: 160000,
      grandTotal: 400000
    }
  ];

  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Closing':
        return 'warn';
      case 'Completed':
        return 'info';
      default:
        return 'info';
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }
} 