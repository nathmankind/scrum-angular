import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ScrumserviceService } from "./scrumservice.service";
import { FormsModule } from "@angular/forms";

import { LoginComponent } from "./login/login.component";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [AppComponent, LoginComponent, UserComponent, HomeComponent, ProfileComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [ScrumserviceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
