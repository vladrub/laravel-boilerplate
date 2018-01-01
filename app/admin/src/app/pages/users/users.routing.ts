import { Routes, RouterModule }  from '@angular/router';
import { UsersListComponent } from './list/users-list.component';
import { UserCreateComponent } from './create/user-create.component';
import { UserDetailsComponent } from './details/user-details.component';
import { UserEditComponent } from './edit/user-edit.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: UsersListComponent,
    },
    {
        path: 'create',
        component: UserCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'details/:id',
        component: UserDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'edit/:id',
        component: UserEditComponent,
        canActivate: [AuthGuard]
    }
];

export const routing = RouterModule.forChild(routes);