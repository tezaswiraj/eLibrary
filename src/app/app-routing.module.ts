import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './genadmin/admin/admin.component';
import { AboutComponent } from './genmodules/about/about.component';
import { HomeComponent } from './genmodules/home/home.component';
import { HeaderComponent } from './genshared/components/header/header.component';
import { UserComponent } from './genuser/user/user.component';
import { DefaultComponent } from './layouts/default/default.component';
import { FullwidthadminComponent } from './layouts/fullwidthadmin/fullwidthadmin.component';
import { FullwidthuserComponent } from './layouts/fullwidthuser/fullwidthuser.component';

const routes: Routes = [
  {
    path:'',component:DefaultComponent,children:[{ path:'', component: HomeComponent}, { path:'about', component:AboutComponent}]
  },
  {
    path: '', component: FullwidthadminComponent, children: [{ path: 'admin', component: AdminComponent}]
  },
  {
    path: '', component: FullwidthuserComponent, children: [{ path: 'user', component: UserComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
