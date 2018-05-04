import { Routes } from '@angular/router';
import { HostComponent } from './host/host.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { PlayComponent } from './play/play.component';
import { LoginComponent } from './login/login.component';
import { RecordingsComponent } from './recordings/recordings.component';

export const routes: Routes = [
    { path: 'host', component: HostComponent },
    { path: 'view/:id', component: ViewComponent},
    { path: 'list', component: ListComponent},
    { path: 'recordings/:id', component: PlayComponent},
    { path: 'recordings', component: RecordingsComponent},
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: 'host', pathMatch: 'full' }
];
