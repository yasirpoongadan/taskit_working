import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
  import {Config} from './config/config';
import { ReCaptchaModule } from 'angular2-recaptcha';
import 'hammerjs';
import { AppComponent } from './app.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { AdminService} from './services/admin.service';
import { CompanyService} from './services/company.service';
import { UserService} from './services/user.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DragulaModule} from '../../node_modules/ng2-dragula/ng2-dragula';
import { ReferenceComponentComponent } from './components/reference-component/reference-component.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminTopbarComponent } from './components/admin-topbar/admin-topbar.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';
import { AdminCompanyComponent } from './components/admin-company/admin-company.component';
import { ButtonsComponent } from "./components/buttons/buttons.component";
import { CountDownTimerComponent } from './components/count-down-timer/count-down-timer.component';
import { AdminAllCompaniesComponent } from './components/admin-all-companies/admin-all-companies.component';
import { AdminSubscribedComponent } from './components/admin-subscribed/admin-subscribed.component';
import { AdminTrialComponent } from './components/admin-trial/admin-trial.component';
import { AdminNotVerifiedComponent } from './components/admin-not-verified/admin-not-verified.component';
import { AdminExpiredComponent } from './components/admin-expired/admin-expired.component';
import { CompanyFooterComponent } from './components/company-footer/company-footer.component';
import { CompanyUsersComponent } from './components/company-users/company-users.component';
import { CompanyProjectCategoryComponent } from './components/company-project-category/company-project-category.component';
import { CompanyEmployeeLeavesComponent } from './components/company-employee-leaves/company-employee-leaves.component';
import { CompanyRequestManagementComponent } from './components/company-request-management/company-request-management.component';
import { CompanyTimeExtensionRequestComponent } from './components/company-time-extension-request/company-time-extension-request.component';
import { CompanyActivityLogComponent } from './components/company-activity-log/company-activity-log.component';
import { CompanyLeaveRequestListComponent } from './components/company-leave-request-list/company-leave-request-list.component';
import { CompanyUserLeaveRequestComponent } from './components/company-user-leave-request/company-user-leave-request.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { UserFooterComponent } from './components/user-footer/user-footer.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserDashboardBarComponent } from './components/user-dashboard-bar/user-dashboard-bar.component';
import { UserActivityLogComponent } from './components/user-activity-log/user-activity-log.component';
import { UserLeaveRequestComponent } from './components/user-leave-request/user-leave-request.component';
import { UserMyRequestComponent } from './components/user-my-request/user-my-request.component';
import { UserMyRequestMytaskComponent } from './components/user-my-request-mytask/user-my-request-mytask.component';
import { UserTaskVsStatusComponent } from './components/user-task-vs-status/user-task-vs-status.component';
import { UserProgressGraphComponent } from './components/user-progress-graph/user-progress-graph.component';
import { UserBarGraphComponent } from './components/user-bar-graph/user-bar-graph.component';
import { UserStatusGraphComponent } from './components/user-status-graph/user-status-graph.component';
import { AdminPlanComponent } from './components/admin-plan/admin-plan.component';
import { HomeComponent } from './components/home/home.component';
import { CompanyUpgradeComponent } from './components/company-upgrade/company-upgrade.component';
import { CompanyPlanlistComponent } from './components/company-planlist/company-planlist.component';
import { AdminDashboardPieComponent } from './components/admin-dashboard-pie/admin-dashboard-pie.component';
import { CompanyAddProjectComponent } from './components/company-add-project/company-add-project.component'
import { CompanyProjectComponent } from './components/company-project/company-project.component';
import { CompanyAssignProjectComponent } from './components/company-assign-project/company-assign-project.component';
import { CompanyEditProjectComponent } from './components/company-edit-project/company-edit-project.component';
import { CompanyLoginComponent } from './components/company-login/company-login.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { CompanyTopbarComponent } from './components/company-topbar/company-topbar.component';
import { UserTopbarComponent } from './components/user-topbar/user-topbar.component';
import { UserProjectEstimationComponent } from './components/user-project-estimation/user-project-estimation.component';
import { CompanyApproveEstimationComponent } from './components/company-approve-estimation/company-approve-estimation.component';
import { CompanyApproveProjectComponent } from './components/company-approve-project/company-approve-project.component';
import { UserEditProfileComponent } from './components/user-edit-profile/user-edit-profile.component';
import { TestUserComponent } from './components/test-user/test-user.component';
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { CompanyTaskVsStatusComponent } from './components/company-task-vs-status/company-task-vs-status.component';
import { CompanyResoureVsHourComponent } from './components/company-resoure-vs-hour/company-resoure-vs-hour.component';
import { CompanyProjectVsHourComponent } from './components/company-project-vs-hour/company-project-vs-hour.component';
import { CompanyProjectVsStatusComponent } from './components/company-project-vs-status/company-project-vs-status.component';
import { CompanyProgressGraphComponent } from './components/company-progress-graph/company-progress-graph.component';
import { CompanyStatusGraphComponent } from './components/company-status-graph/company-status-graph.component';
import { CompanyBarGraphComponent } from './components/company-bar-graph/company-bar-graph.component';
import { AdminDashboardBarComponent } from './components/admin-dashboard-bar/admin-dashboard-bar.component';
import { CompanySignupComponent } from './components/company-signup/company-signup.component'
import { CompayAditninfoComponent } from './components/compay-aditninfo/compay-aditninfo.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CompanySidebarComponent } from './components/company-sidebar/company-sidebar.component';
import { CompanyProjectPlanningComponent } from './components/company-project-planning/company-project-planning.component';
import { CompanyManageTeamComponent } from './components/company-manage-team/company-manage-team.component';
import { CompanyManageAccessRightsComponent } from './components/company-manage-access-rights/company-manage-access-rights.component';
import { AdminEstimationReportComponent } from './components/admin-estimation-report/admin-estimation-report.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FocusDirective } from './app.myfocus';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
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
  MatTooltipModule,
  MatStepperModule,
 MatFormFieldModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import { SuperAdminService } from './services/super-admin.service';
import { TimerService } from './services/timer.service';
import { OverlayNotifcountService } from './services/overlay-notifcount.service';
import { UserTaskManagementComponent } from './components/user-task-management/user-task-management.component';
import { CompanyExpiredComponent } from './components/company-expired/company-expired.component';
import { SimpleTimer } from 'ng2-simple-timer';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CompanyWorkingTimeComponent } from './components/company-working-time/company-working-time.component';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TreeviewModule } from 'ngx-treeview';
import { TreeModule, SharedModule } from 'primeng/primeng';
import { CompanyManageHolidaysComponent } from './components/company-manage-holidays/company-manage-holidays.component';
import { CompanyHolidayComponent } from './components/company-holiday/company-holiday.component';
import { UserProjectsComponent } from './components/user-projects/user-projects.component';
import { UserViewProjectComponent } from './components/user-view-project/user-view-project.component';

import { ProjectPipe } from './pipes/project.pipe';
import { CompanyTaskRequestsComponent } from './components/company-task-requests/company-task-requests.component';
import { CompanyNewTaskManagementComponent } from './components/company-new-task-management/company-new-task-management.component';
import { AdminProjectReportComponent } from './components/admin-project-report/admin-project-report.component';
import { CompanyActivityLogReportComponent } from './components/company-activity-log-report/company-activity-log-report.component';


import { CompanyViewProjectComponent } from './components/company-view-project/company-view-project.component';
import { UserTaskstatusGraphComponent } from './components/user-taskstatus-graph/user-taskstatus-graph.component';
import {ScrollToModule} from 'ng2-scroll-to';
import { CompanyManageDesignationComponent } from './components/company-manage-designation/company-manage-designation.component';
import { UserTaskVerificationComponent } from './components/user-task-verification/user-task-verification.component';
import { CompanyApproveProjectFinalComponent } from './components/company-approve-project-final/company-approve-project-final.component';
import { CompanyRevisedExecutionPlanComponent } from './components/company-revised-execution-plan/company-revised-execution-plan.component';
import { CompanyShowRevisedProjectsComponent } from './components/company-show-revised-projects/company-show-revised-projects.component';
import { TeamfilterPipe } from './pipes/teamfilter.pipe';
import { UsersPipe } from './pipes/users.pipe';
import { ViewprojectPipe } from './pipes/viewproject.pipe';

const appRoutes: Routes = [
  {path: '', component: HomeComponent },
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'reference', component:ReferenceComponentComponent},
  {path:'admin-login', component:AdminLoginComponent},
  {path:'admin-sidebar', component:AdminSidebarComponent},
  {path:'admin-topbar', component:AdminTopbarComponent},
  {path:'admin-footer', component:AdminFooterComponent},
  {path:'admin-company', component:AdminCompanyComponent},
  {path:'admin-dashboard', component:AdminDashboardComponent},
  {path:'admin-all-companies', component:AdminAllCompaniesComponent},
  {path:'admin-subscribed', component:AdminSubscribedComponent},
  {path:'admin-trial', component:AdminTrialComponent},
  {path:'admin-NotVerified', component:AdminNotVerifiedComponent},
  {path:'admin-expired', component:AdminExpiredComponent},
  {path:'company-sidebar', component:CompanySidebarComponent},
  {path:'company-topbar', component:CompanyTopbarComponent},
  {path:'company-footer', component:CompanyFooterComponent},
  {path:'company-users', component:CompanyUsersComponent},
  {path:'company-project-category', component:CompanyProjectCategoryComponent},
  {path:'company-employee-leaves', component:CompanyEmployeeLeavesComponent},
  {path:'company-request-management', component:CompanyRequestManagementComponent},
  {path:'company-time-extension-request/:id1/:id2', component:CompanyTimeExtensionRequestComponent},
  {path:'user-topbar', component:UserTopbarComponent},
  {path:'user-sidebar', component:UserSidebarComponent},
  {path:'user-footer', component:UserFooterComponent},
  {path:'user-dashboard', component:UserDashboardComponent},
  {path:'user-activity-log', component:UserActivityLogComponent},
  {path:'user-leave-request', component:UserLeaveRequestComponent},
  {path:'company-activity-log', component:CompanyActivityLogComponent},
  {path:'user-my-request', component:UserMyRequestComponent},
  {path:'user-dashboard-bar', component:UserDashboardBarComponent},
  {path:'user-task-vs-status', component:UserDashboardBarComponent},
  {path:'user-progress-graph', component:UserProgressGraphComponent},
  {path:'user-bar-graph', component:UserBarGraphComponent},
  {path:'user-status-graph', component:UserStatusGraphComponent},
  {path:'company-leave-request-list', component:CompanyLeaveRequestListComponent},
  {path:'company-user-leave-request/:id', component:CompanyUserLeaveRequestComponent},
  {path:'user-my-request-mytask', component:UserMyRequestMytaskComponent},
  {path:'admin-plan', component:AdminPlanComponent},
  {path:'home', component:HomeComponent},
  {path:'planlist', component:CompanyPlanlistComponent},
  {path:'upgrade/:id', component:CompanyUpgradeComponent},
  {path:'add-project', component:CompanyAddProjectComponent},
  {path:'project', component:CompanyProjectComponent},
  {path:'assign-project/:id', component:CompanyAssignProjectComponent},
  {path:'company-dashboard', component:CompanyDashboardComponent},
  {path:'company-signup', component:CompanySignupComponent},
  {path:'company-access-rights', component:CompanyManageAccessRightsComponent},
  {path:'company-working-time', component:CompanyWorkingTimeComponent},
  {path:'company-manage-holyday', component:CompanyManageHolidaysComponent},
  {path:'company-task-requests', component:CompanyTaskRequestsComponent},
  {path:'company-task-manage/:id', component:CompanyNewTaskManagementComponent},
  {path:'company-login', component:CompanyLoginComponent},
  {path:'compay-aditninfo/:id', component:CompayAditninfoComponent},
  {path:'company-team', component:CompanyManageTeamComponent},
  {path:'email-verification/:id', component:EmailVerificationComponent},
  {path:'edit-project/:id', component:CompanyEditProjectComponent},
  {path:'approve-estimation/:id', component:CompanyApproveEstimationComponent},
  {path:'approve-project/:id', component:CompanyApproveProjectComponent},
  {path:'edit-profile', component:UserEditProfileComponent},
  {path:'test-user', component:TestUserComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'project-planning/:id', component:CompanyProjectPlanningComponent},
  {path:'expired', component:CompanyExpiredComponent},
  {path:'user-task-management', component:UserTaskManagementComponent},
  {path:'project-estimation-report', component:AdminEstimationReportComponent},
  {path:'spinner', component:SpinnerComponent},//To check component
  {path:'user-projects', component:UserProjectsComponent},
  {path:'user-view-project/:id', component:UserViewProjectComponent},
  {path:'estimate-project/:id1/:id2', component:UserProjectEstimationComponent},
  {path:'view-project/:id', component:CompanyViewProjectComponent},
  {path:'revised-execution-planning/:id', component:CompanyRevisedExecutionPlanComponent},
  {path:'user-taskstatus-graph', component:UserTaskstatusGraphComponent},
  {path:'project-report', component:AdminProjectReportComponent},
  {path:'activity-log-report', component:CompanyActivityLogReportComponent},
  {path:'company-manage-designation', component:CompanyManageDesignationComponent},
  {path:'user-task-verification', component:UserTaskVerificationComponent},
  {path:'company-project-approval/:id', component:CompanyApproveProjectFinalComponent},
  
  {path:'revise-project/:id', component:CompanyShowRevisedProjectsComponent},
  
  // {path:'admin-sidebar', component:AdminSidebarComponent},
  // {path:'admin-topbar', component:AdminTopbarComponent},
  // {path:'admin-footer', component:AdminFooterComponent},
  // {path:'company-topbar', component:CompanyTopbarComponent},
  // {path:'company-footer', component:CompanyFooterComponent},
] 
@NgModule({
  exports: [
    CdkTableModule,
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
    MatTooltipModule,
  ],
  declarations: [],

  
})
export class DemoMaterialModule {}
@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    ReferenceComponentComponent,
    AdminLoginComponent,
    AdminSidebarComponent,
    AdminFooterComponent,
    AdminCompanyComponent,
    AdminAllCompaniesComponent,
    AdminSubscribedComponent,
    AdminTrialComponent,
    AdminNotVerifiedComponent,
    AdminExpiredComponent,
    AdminPlanComponent,
    HomeComponent,
    CompanyPlanlistComponent,
    CompanyUpgradeComponent,
    AdminDashboardPieComponent,
    CompanyAddProjectComponent,
    CompanyProjectComponent,
    CompanyLoginComponent,
    EmailVerificationComponent,
    CompanyAssignProjectComponent,
    CompanyEditProjectComponent,
    CompanyTopbarComponent,
    UserTopbarComponent, 
    UserProjectEstimationComponent,
    CompanyApproveEstimationComponent,
    CompanyApproveProjectComponent,
    UserEditProfileComponent,
    TestUserComponent,
    CompanyLoginComponent,
    EmailVerificationComponent,
    CompayAditninfoComponent,
    ForgotPasswordComponent,
    AdminDashboardPieComponent,
    AdminDashboardBarComponent,
    CompanySignupComponent,
    SpinnerComponent,
    CompanyTopbarComponent,
    CompanySidebarComponent,
    CompanyProjectPlanningComponent,
    CompanyDashboardComponent,
    CompanyTaskVsStatusComponent,
    CompanyResoureVsHourComponent,
    CompanyProjectVsHourComponent,
    CompanyProjectVsStatusComponent,
    CompanyProgressGraphComponent,
    CompanyStatusGraphComponent,
    CompanyBarGraphComponent,
    CompanyManageTeamComponent, 
    CompanyManageAccessRightsComponent,
    CompanyExpiredComponent,
    UserTaskManagementComponent,
    UserSidebarComponent,
    UserTopbarComponent,
    ButtonsComponent,
    CountDownTimerComponent,
    CompanyWorkingTimeComponent,
    CompanyManageHolidaysComponent,
    UserProjectsComponent,
    UserViewProjectComponent, 
    ProjectPipe,
    CompanyTaskRequestsComponent,
    CompanyNewTaskManagementComponent,
    AdminDashboardComponent,
    AdminEstimationReportComponent,
    AdminLoginComponent,
    AdminSidebarComponent,
    AdminTopbarComponent,
    AdminFooterComponent,
    AdminCompanyComponent,
    AdminAllCompaniesComponent,
    AdminSubscribedComponent,
    AdminTrialComponent,
    AdminNotVerifiedComponent,
    AdminExpiredComponent,
    CompanyTopbarComponent, 
    CompanyFooterComponent,
    CompanySidebarComponent,
    CompanyUsersComponent,
    CompanyProjectCategoryComponent,
    CompanyEmployeeLeavesComponent,
    CompanyRequestManagementComponent,
    CompanyTimeExtensionRequestComponent,
    CompanyActivityLogComponent,
    UserTopbarComponent,
    UserSidebarComponent,
    UserFooterComponent,
    UserDashboardComponent,
    UserActivityLogComponent,
    UserLeaveRequestComponent,
    UserMyRequestComponent,
    UserDashboardBarComponent,
    UserTaskVsStatusComponent,
    UserProgressGraphComponent,
    UserBarGraphComponent,
    UserStatusGraphComponent,
    CompanyLeaveRequestListComponent,
    CompanyUserLeaveRequestComponent,
    UserMyRequestMytaskComponent,
    AdminProjectReportComponent,
    CompanyActivityLogReportComponent,
    CompanyViewProjectComponent,
    UserTaskstatusGraphComponent,
    FocusDirective,
    CompanyManageDesignationComponent,
    UserTaskVerificationComponent,
    CompanyApproveProjectFinalComponent,
    CompanyRevisedExecutionPlanComponent,
    CompanyShowRevisedProjectsComponent,
    TeamfilterPipe,
    UsersPipe,
    ViewprojectPipe
    
  ],
  imports: [
  BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    DragulaModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    DemoMaterialModule,
    NgbModule.forRoot(),
    TreeviewModule.forRoot(),TreeModule, SharedModule,
    ReCaptchaModule,
    NgbModule.forRoot(),
    TreeviewModule.forRoot(),
    Daterangepicker,
    ScrollToModule.forRoot()

  ],
  providers: [Config,CompanyService,AdminService,SuperAdminService,SimpleTimer,UserService,TimerService,OverlayNotifcountService ],
  bootstrap: [AppComponent]
})
export class AppModule { }