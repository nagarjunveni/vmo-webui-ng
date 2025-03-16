import { Routes } from '@angular/router';
import { WorkOrdersComponent } from './components/work-orders/work-orders.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { PositionsComponent } from './components/positions/positions.component';
import { LineManagersComponent } from './components/line-managers/line-managers.component';
import { AuthorizedSignaturesComponent } from './components/authorized-signatures/authorized-signatures.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { ViewStatementOfWorkComponent } from './components/view-statement-of-work/view-statement-of-work.component';
import { EmployeesComponent } from './components/employees/employees.component';

export const routes: Routes = [
  { path: '', redirectTo: 'work-orders', pathMatch: 'full' },
  { path: 'work-orders', component: WorkOrdersComponent },
  { path: 'work-orders/:id', component: ViewStatementOfWorkComponent },
  { path: 'resources', component: EmployeesComponent },
  { path: 'positions', component: PositionsComponent },
  { path: 'vendors', component: VendorsComponent },
  { path: 'line-managers', component: LineManagersComponent},
  { path: 'authorized-signatures', component: AuthorizedSignaturesComponent},
  { path: '**', redirectTo: 'work-orders', pathMatch: 'full' }
];
