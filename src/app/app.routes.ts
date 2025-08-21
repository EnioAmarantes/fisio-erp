import { Routes } from '@angular/router';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerDataComponent } from './pages/customers/customer-data/customer-data.component';

export const routes: Routes = [
    { path: '', redirectTo: 'customers', pathMatch: 'full' },
    { path: 'customers', component: CustomersComponent },
    { path: 'customers/new', component: CustomerDataComponent },
    { path: 'customer-data/:id', component: CustomerDataComponent },
];
