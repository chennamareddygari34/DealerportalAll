import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeadsComponent } from './leads/leads.component';
import { DealsComponent } from './deals/deals.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { AdduserdialogComponent } from './adduserdialog/adduserdialog.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { DocumentverificationComponent } from './documentverification/documentverification.component';
import { LoanstatusComponent } from './loanstatus/loanstatus.component';
import { CreditscoreComponent } from './creditscore/creditscore.component';
import { ApplicantdetailsComponent } from './applicantdetails/applicantdetails.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'leads', component: LeadsComponent },
  { path: 'deals', component: DealsComponent },
  { path: 'profile', component: ProfileComponent },
  {path:'adduserdialog',component:AdduserdialogComponent},
  {path:'applicant',component:ApplicantComponent},
  { path: 'documentverification', component: DocumentverificationComponent },
  { path: 'loanstatus', component: LoanstatusComponent },
  {path:'creditscore',component:CreditscoreComponent},
  {path:'applicantdetails',component:ApplicantdetailsComponent}

];


// const routes: Routes = [
//   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'leads', component: LeadsComponent },
//   { path: 'deals', component: DealsComponent },
//   { path: 'login', component: LoginComponent },
// ];
// const routes: Routes = [
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
//   { path: 'leads', component: LeadsComponent, canActivate: [AuthGuard] },
//   { path: 'deals', component: DealsComponent, canActivate: [AuthGuard] },
//   { path: 'login', component: LoginComponent },
//   { path: '**', redirectTo: '/login', pathMatch: 'full' }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }