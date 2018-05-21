import { Routes } from '@angular/router';
import { HostComponent } from './host/host.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { PlayComponent } from './play/play.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecordingsComponent } from './recordings/recordings.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
    { path: 'host', component: HostComponent, canActivate: [AuthGuard] },
    { path: 'view/:id', component: ViewComponent},
    { path: 'list', component: ListComponent},
    { path: 'recordings/:id', component: PlayComponent},
    { path: 'recordings', component: RecordingsComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '', redirectTo: 'host', pathMatch: 'full' }
];
