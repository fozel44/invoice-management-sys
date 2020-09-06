import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultantListComponent } from './consultant/consultant-list/consultant-list.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { AuthGuard } from './service/auth-guard';
import { LoginComponent } from './login/login.component';
import { Role } from './domain/role';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { InvoiceDetailsComponent } from './invoice/invoice-details/invoice-details.component';
import { AddImageComponent } from './uploads/add-image/add-image.component';
import { ConsultantProfileComponent } from './consultant/consultant-profile/consultant-profile.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '',canActivate:[AuthGuard] },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path:"consultant-list", component:ConsultantListComponent,canActivate: [AuthGuard],data: { roles: [{id:3,name:"ROLE_ADMIN"},{id:4,name:"ROLE_USER"}]}},
  //{ path:"invoice-list/:consultantId", component:InvoiceListComponent,canActivate: [AuthGuard],data: { roles: [{id:4,name:"ROLE_USER"}]}},
  // { path:"invoice-list/:companyId", component:InvoiceListComponent,canActivate: [AuthGuard],data: { roles: [Role.Admin]}},
  {path:"company-profile", component:CompanyProfileComponent,canActivate: [AuthGuard],data: { roles: [{id:3,name:"ROLE_ADMIN"},{id:4,name:"ROLE_USER"}]}},

  {path:"login",component:LoginComponent},//redirectTo:AuthenticationService.redirectTo() buna benzer bir yöntemle yönlendirme yapılacak.
  {path:"invoice-list", component:InvoiceListComponent,canActivate: [AuthGuard],data: { roles: [{id:3,name:"ROLE_ADMIN"}]}},
  {path:"company-list", component:CompanyListComponent,canActivate: [AuthGuard],data: { roles: [{id:3,name:"ROLE_ADMIN"},{id:4,name:"ROLE_USER"}]}},
  {path:"user-list", component:UserListComponent,canActivate: [AuthGuard],data: { roles: [{id:3,name:"ROLE_ADMIN"}]}},
  {path:"invoice-details", component:InvoiceDetailsComponent,canActivate: [AuthGuard],data: { roles: [{id:3,name:"ROLE_ADMIN"},{id:5,name:"ROLE_CONSULTANT"}]}},
  {path:"consultant-profile", component:ConsultantProfileComponent,canActivate: [AuthGuard],data: { roles: [{id:3,name:"ROLE_ADMIN"},{id:4,name:"ROLE_USER"}]}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }