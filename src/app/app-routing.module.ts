import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminmoduleComponent } from './adminmodule/adminmodule.component';
import { BooksComponent } from './adminmodule/books/books.component';
import { MembersComponent } from './adminmodule/members/members.component';
import { TransactionComponent } from './adminmodule/transaction/transaction.component';
import { AdminComponent } from './genadmin/admin/admin.component';
import { AboutComponent } from './genmodules/about/about.component';
import { HomeComponent } from './genmodules/home/home.component';
import { HeaderComponent } from './genshared/components/header/header.component';
import { UserComponent } from './genuser/user/user.component';
import { DefaultComponent } from './layouts/default/default.component';
import { FullwidthadminComponent } from './layouts/fullwidthadmin/fullwidthadmin.component';
import { FullwidthuserComponent } from './layouts/fullwidthuser/fullwidthuser.component';
import { TestComponent } from './test/test/test.component';

const routes: Routes = [
  {
    path:'',component:DefaultComponent,children:[{ path:'', component: HomeComponent}, { path:'about', component:AboutComponent}]
  },
  {
    path: '', component: FullwidthadminComponent, children: [{ path: 'admin', component: AdminComponent}]
  },
  {
    path: '', component: FullwidthuserComponent, children: [{ path: 'user', component: UserComponent}]
  },
  { path: 'admin', loadChildren: () => import('./adminmodule/adminmodule.module').then(m => m.AdminmoduleModule) },
  {
    path: 'admin', component: AdminmoduleComponent, children: [
      { path: 'books', component: BooksComponent },
      { path: 'members', component: MembersComponent },
      { path: 'transaction', component: TransactionComponent }
    ]
  },
  { path:'test', component:TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
