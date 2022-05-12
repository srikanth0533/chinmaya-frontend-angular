import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ParticipantListComponent } from "./components/participant-list/participant-list.component";
import { GroupListComponent } from "./components/group-list/group-list.component";
import { HallTicketsComponent } from "./components/hall-tickets/hall-tickets.component";
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
import { PaymentLinkComponent } from './payment-link/payment-link.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { ParticipantStatusComponent } from './participant-status/participant-status.component';
import { UserAuthGuardService } from './gaurds/user-auth-guard.service';
import { MaintenanceModeComponent } from './maintenance-mode/maintenance-mode.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { RegistrationCloseComponent } from './registration-close/registration-close.component';
import { UnsubscribePageComponent } from './unsubscribe-page/unsubscribe-page.component';
import { FinalSessionDetailsComponent } from './final-session-details/final-session-details.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent ,canActivate: [UserAuthGuardService]},
  { path: "participants", component: ParticipantListComponent ,canActivate: [UserAuthGuardService],},
  { path: "groupList", component: GroupListComponent ,canActivate: [UserAuthGuardService]},
  { path: "hallTickets", component: HallTicketsComponent ,canActivate: [UserAuthGuardService]},
  { path: "certificate", component: CertificateComponent ,canActivate: [UserAuthGuardService]},
  { path: "navBar", component: NavBarComponent ,canActivate: [UserAuthGuardService]},
  { path: "mobileVerification", component: MobileVerificationComponent},
  { path: "slotDashboard", component: SlotDashboardComponent ,canActivate: [UserAuthGuardService]},
  { path: "batchDashboard", component: BatchDashboardComponent ,canActivate: [UserAuthGuardService]},
  { path: "slotDetail", component: SessionLinkComponent },
  { path: "participantCertificate", component: CertficateLinkComponent ,canActivate: [UserAuthGuardService]},
  { path: "winnerCertificate", component: WinnerCertificateComponent },
  { path: "winnerLink", component: WinnerLinkComponent },
  { path: "unSubscribe", component: UnSubscribeComponent },
  { path: "websiteStats", component: WebsiteStatsComponent },
  { path: "paymentDashboard", component: PaymentDashboardComponent ,canActivate: [UserAuthGuardService],},
  { path: "registrationForm", component: RegistrationFormComponent },
  { path: "paymentLink", component: PaymentLinkComponent },
  { path: "paymentPage", component: PaymentPageComponent },
  { path: "participantStatus", component: ParticipantStatusComponent },
  { path: "maintenanceMode", component: MaintenanceModeComponent },
  { path: "configuration", component: ConfigurationComponent ,canActivate: [UserAuthGuardService] },
  { path: "registrationClose", component: RegistrationCloseComponent},
  { path: "unsubscribePage", component:UnsubscribePageComponent},
  { path: "finalSession", component:FinalSessionDetailsComponent},
  
  
  
  
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
