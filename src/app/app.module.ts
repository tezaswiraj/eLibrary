import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';

import { NgForm } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './genshared/components/header/header.component';
import { FooterComponent } from './genshared/components/footer/footer.component';
import { HomeComponent } from './genmodules/home/home.component';
import { AboutComponent } from './genmodules/about/about.component';
import { UserComponent } from './genuser/user/user.component';
import { AdminComponent } from './genadmin/admin/admin.component';
import { FullwidthuserComponent } from './layouts/fullwidthuser/fullwidthuser.component';
import { FullwidthadminComponent } from './layouts/fullwidthadmin/fullwidthadmin.component';
import { DefaultComponent } from './layouts/default/default.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { environment } from '../environments/environment';
import { TestComponent } from './test/test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    UserComponent,
    AdminComponent,
    FullwidthuserComponent,
    FullwidthadminComponent,
    DefaultComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
