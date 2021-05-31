import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AdminmoduleRoutingModule } from './adminmodule-routing.module';
import { AdminmoduleComponent } from './adminmodule.component';
import { BooksComponent } from './books/books.component';
import { MembersComponent } from './members/members.component';
import { TransactionComponent } from './transaction/transaction.component';


@NgModule({
  declarations: [
    AdminmoduleComponent,
    BooksComponent,
    MembersComponent,
    TransactionComponent
  ],
  imports: [
    CommonModule,
    AdminmoduleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminmoduleComponent,
    BooksComponent,
    MembersComponent,

  ]
})
export class AdminmoduleModule { }
