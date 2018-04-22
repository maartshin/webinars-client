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


@NgModule({
  declarations: [
    AppComponent,
    HostComponent,
    MenuComponent,
    ViewComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot( routes, {useHash: true})
  ],
  providers: [ JanusService, WebrtcService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
