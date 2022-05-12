import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { GroupListComponent } from "./components/group-list/group-list.component";
import { HallTicketsComponent } from "./components/hall-tickets/hall-tickets.component";
import { ToastrModule } from "ngx-toastr";
import { NgxPrintModule } from "ngx-print";
import { DragDropDirective } from "./service/drag-drop.directive";
import { ParticipantListComponent } from "./components/participant-list/participant-list.component";
import { CertificateComponent } from './certificate/certificate.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MobileVerificationComponent } from './mobile-verification/mobile-verification.component';
import { SlotDashboardComponent } from './slot-dashboard/slot-dashboard.component';
import { SessionLinkComponent } from './session-link/session-link.component';
import { BatchDashboardComponent } from './batch-dashboard/batch-dashboard.component';
import { CertficateLinkComponent } from './certficate-link/certficate-link.component';
import { WinnerCertificateComponent } from './winner-certificate/winner-certificate.component';
import { WinnerLinkComponent } from './winner-link/winner-link.component';
import { UnSubscribeComponent } from './un-subscribe/un-subscribe.component';
import { WebsiteStatsComponent } from './website-stats/website-stats.component';
import { PaymentDashboardComponent } from './payment-dashboard/payment-dashboard.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { SafePipe } from './safe.pipe';
import { PaymentLinkComponent } from './payment-link/payment-link.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { ParticipantStatusComponent } from './participant-status/participant-status.component';
import { MaintenanceModeComponent } from './maintenance-mode/maintenance-mode.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { RegistrationCloseComponent } from './registration-close/registration-close.component';
import { UnsubscribePageComponent } from './unsubscribe-page/unsubscribe-page.component';
import { FinalSessionDetailsComponent } from './final-session-details/final-session-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DashboardComponent,
    GroupListComponent,
    HallTicketsComponent,
    DragDropDirective,
    ParticipantListComponent,
    CertificateComponent,
    LoginComponent,
    NavBarComponent,
    MobileVerificationComponent,
    SlotDashboardComponent,
    SessionLinkComponent,
    BatchDashboardComponent,
    CertficateLinkComponent,
    WinnerCertificateComponent,
    WinnerLinkComponent,
    UnSubscribeComponent,
    WebsiteStatsComponent,
    PaymentDashboardComponent,
    RegistrationFormComponent,
    SafePipe,
    PaymentLinkComponent,
    PaymentPageComponent,
    ParticipantStatusComponent,
    MaintenanceModeComponent,
    ConfigurationComponent,
    RegistrationCloseComponent,
    UnsubscribePageComponent,
    FinalSessionDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-center",
      maxOpened: 1,
      preventDuplicates: true,
      closeButton: true,
      timeOut: 3000
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPrintModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
