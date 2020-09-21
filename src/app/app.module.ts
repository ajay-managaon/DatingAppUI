import {
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ValueComponent } from "./value/value.component";
import { HttpClientModule } from "@angular/common/http";
import { NavComponent } from "./nav/nav.component";
import { FormsModule } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { ErrorInterceptorProvider } from "./errors/error.interceptor";
import { BsDropdownModule, TabsModule } from "ngx-bootstrap";
import { ListsComponent } from "./lists/lists.component";
import { MemberListsComponent } from "./members/member-lists/member-lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";

import { NgxGalleryModule } from "ngx-gallery";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";

import { MemberDetailResolver } from "./resolver/member-detail.resolver";
import { MemberListResolver } from "./resolver/member-list.resolver";
import { MemberEditResolver } from "./resolver/member-edit.resolver";
import { PreventNavigation } from './authguards/prevent-navigation';

export function tokenGetter() {
  return localStorage.getItem("token");
}

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MemberListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.jwtUrl],
        disallowedRoutes: [environment.jwtAuthUrl],
      },
    }),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventNavigation,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
