import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { TableComponent } from './UserOperation/table/table.component';
import { ReportTableComponent } from './UserComponent/report-table/report-table.component';
import { LoginComponent } from './UserOperation/login/login.component';
import { AuthGuard } from './shared/auth.guard';
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
