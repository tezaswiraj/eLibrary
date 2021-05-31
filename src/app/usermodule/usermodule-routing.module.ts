import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsermoduleComponent } from './usermodule.component';

const routes: Routes = [{ path: '', component: UsermoduleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermoduleRoutingModule { }
