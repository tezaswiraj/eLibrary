import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms'
// import { GensharedModule } from '../genshared/genshared.module';
// import { FullwidthuserModule } from '../layouts/fullwidthuser/fullwidthuser.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsermoduleRoutingModule } from './usermodule-routing.module';
import { UsermoduleComponent } from './usermodule.component';
import { BorrowComponent } from './borrow/borrow.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    UsermoduleComponent,
    BorrowComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UsermoduleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsermoduleModule { }
