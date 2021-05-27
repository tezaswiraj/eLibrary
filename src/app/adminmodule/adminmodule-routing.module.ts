import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminmoduleComponent } from './adminmodule.component';

const routes: Routes = [{ path: '', component: AdminmoduleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminmoduleRoutingModule { }
