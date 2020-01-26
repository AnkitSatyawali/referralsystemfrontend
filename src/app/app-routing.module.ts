import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from  './components/home/home.component';
import { RegisterComponent } from  './components/register/register.component';
import { ReferralsComponent } from './components/referrals/referrals.component';

const routes: Routes = [
	{path:'home',component:HomeComponent},
   {path:'register/:code',component:RegisterComponent},
   {path:'register',component:RegisterComponent},
   {path:'referrals',component:ReferralsComponent},
   {path:'**',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
