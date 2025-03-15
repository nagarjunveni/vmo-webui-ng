import { Routes } from '@angular/router';
import { WorkOrdersComponent } from './components/work-orders/work-orders.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { PositionsComponent } from './components/positions/positions.component';
import { LineManagersComponent } from './components/line-managers/line-managers.component';
import { AuthorizedSignaturesComponent } from './components/authorized-signatures/authorized-signatures.component';
import { VendorsComponent } from './components/vendors/vendors.component';

export const routes: Routes = [
  { path: '', redirectTo: 'work-orders', pathMatch: 'full' },
  { path: 'work-orders', component: WorkOrdersComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'positions', component: PositionsComponent },
  { path: 'vendors', component: VendorsComponent },
  { path: 'line-managers', component: LineManagersComponent},
  { path: 'authorized-signatures', component: AuthorizedSignaturesComponent},
  { path: '**', redirectTo: 'work-orders', pathMatch: 'full' }
];
