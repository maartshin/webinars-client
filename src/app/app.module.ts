import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from "@angular/router";
import { routes } from "./routes";
import { AppComponent } from './app.component';
import { HostComponent } from './host/host.component';
import { MenuComponent } from './menu/menu.component';
import { JanusService } from './services/janus.service';
import { WebrtcService } from './services/webrtc.service';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { PlayComponent } from './play/play.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { HttpModule } from '@angular/http';
import { RecordingsComponent } from './recordings/recordings.component';
import { MediaService } from './services/media.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    HostComponent,
    MenuComponent,
    ViewComponent,
    ListComponent,
    PlayComponent,
    LoginComponent,
    RecordingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot( routes, {useHash: true})
  ],
  providers: [ JanusService, WebrtcService, UserService, MediaService, AuthGuardService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
