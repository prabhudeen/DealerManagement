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
import { TableComponent } from './UserOperation/table/table.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { ReportTableComponent } from './UserComponent/report-table/report-table.component';
import { LoginComponent } from './UserOperation/login/login.component';
import { CommonService } from './shared/common.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './UserOperation/table/Filter.pipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ReportService } from './UserComponent/report-table/report.service';
import { AngularWebStorageModule } from 'angular-web-storage';
import { SessionService } from './shared/session.service';
import { AuthGuard } from './shared/auth.guard';
import { OrderByPipe } from './UserOperation/table/order.pipe';
import { FixedpluginModule } from './shared/fixedplugin/fixedplugin.module';
import { Datefilterpipe } from './datefilterpipe';
import { AppConfigurationService } from './app-configuration.service';


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