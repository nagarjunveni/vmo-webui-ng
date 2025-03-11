import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WorkOrdersComponent } from './work-orders/work-orders.component';
// import { ResourcesComponent } from './resources/resources.component';
// import { PositionsComponent } from './positions/positions.component';
// import { VendorsComponent } from './vendors/vendors.component';

export const routes: Routes = [
  { path: '', redirectTo: 'work-orders', pathMatch: 'full' },
  { path: 'work-orders', component: WorkOrdersComponent },
  // { path: 'resources', component: ResourcesComponent },
  // { path: 'positions', component: PositionsComponent },
  // { path: 'vendors', component: VendorsComponent },
  { path: '**', redirectTo: 'work-orders', pathMatch: 'full' }
];
