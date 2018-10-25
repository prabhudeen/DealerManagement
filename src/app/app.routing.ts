import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { TableComponent } from './UserOperation/table/table.component';
import { InvoicemodelComponent } from './UserComponent/invoicemodel/invoicemodel.component';
import { ReportTableComponent } from './UserComponent/report-table/report-table.component';

import { LoginComponent123 } from './UserOperation/login/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DealerComponent } from './UserComponent/dealer/dealer.component';
import { PlanComponent } from './UserComponent/plan/plan.component';

export const AppRoutes: Routes = [

  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'table', component: TableComponent

      },
      {
        path: 'dealer', component: DealerComponent
      },
      {
        path: 'report', component: ReportTableComponent
      },
      {
        path: 'plan', component: PlanComponent
      },

    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [

      {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      }]
  },

  {
    path: 'Login',
    component: LoginComponent123
  }


];
