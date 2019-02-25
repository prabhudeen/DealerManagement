import { Routes } from '@angular/router';
import { LoginComponent } from './UserOperation/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { TableComponent } from './UserOperation/saleTransaction/table.component';
import { ReportTableComponent } from './UserOperation/report-table/report-table.component';
import { AdminLayoutComponent } from './Helpers/layouts/admin/admin-layout.component';
export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'table', component: TableComponent, canActivate: [AuthGuard]

      },     
      {
        path: 'report', component: ReportTableComponent, canActivate: [AuthGuard]
      },     
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '**', redirectTo: 'login' }
];
