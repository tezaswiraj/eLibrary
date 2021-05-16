import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
