import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { LoginComponent } from './UserOperation/login/login.component';
import { CommonService } from './shared/common.service';
import { HttpClientModule } from '@angular/common/http';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AngularWebStorageModule } from 'angular-web-storage';
import { SessionService } from './shared/session.service';
import { AuthGuard } from './shared/auth.guard';
import { AppConfigurationService } from './app-configuration.service';
import { TableComponent } from './UserOperation/saleTransaction/table.component';
import { ReportTableComponent } from './UserOperation/report-table/report-table.component';
import { ReportService } from './UserOperation/report-table/report.service';
import { Datefilterpipe } from './Shared/datefilterpipe';
import { FilterPipe } from './Shared/Filter.pipe';
import { OrderByPipe } from './Shared/order.pipe';
import { SidebarModule } from './Helpers/sidebar/sidebar.module';
import { NavbarModule } from './Helpers/shared/navbar/navbar.module';
import { FixedpluginModule } from './Helpers/shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './Helpers/shared/footer/footer.module';
import { AdminLayoutComponent } from './Helpers/layouts/admin/admin-layout.component';


export function initializeApp(appConfigurationService: AppConfigurationService) {
  return () => new Promise((resolve, reject) => {
    appConfigurationService.loadConfiguration('assets/configuration/config.json').then(
      (response) => {
        console.log(response);
        resolve();
      }
    ).catch(
      (error) => {
        console.log(error);
        reject();
      }
    )
  });

}

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: []
})
export class MaterialModule { }
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    MatNativeDateModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedpluginModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes,{
      useHash:true
    }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AngularWebStorageModule
  ],
  declarations: [
    AppComponent,
    TableComponent,
    AdminLayoutComponent,   
    ReportTableComponent,
    LoginComponent,    
    Datefilterpipe,
    FilterPipe,
    OrderByPipe
  ],
  providers: [CommonService,
    ReportService,
    SessionService,
    AuthGuard, 
    AppConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigurationService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
