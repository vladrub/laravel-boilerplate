import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'users',  loadChildren: 'app/pages/users/users.module#UsersModule', canActivate: [AuthGuard] },
      { path: 'photo-contest',  loadChildren: 'app/pages/photoContest/photo-contest.module#PhotoContestModule', canActivate: [AuthGuard] },
      { path: 'schedule',  loadChildren: 'app/pages/schedule/schedule.module#ScheduleModule', canActivate: [AuthGuard] },
      { path: 'messages',  loadChildren: 'app/pages/messages/messages.module#MessagesModule', canActivate: [AuthGuard] }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
