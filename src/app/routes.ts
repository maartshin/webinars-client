import { Routes } from '@angular/router';
import { HostComponent } from './host/host.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
    { path: 'host', component: HostComponent },
    { path: 'view/:id', component: ViewComponent},
    { path: 'list', component: ListComponent},
    { path: '', redirectTo: 'host', pathMatch: 'full' }
];
