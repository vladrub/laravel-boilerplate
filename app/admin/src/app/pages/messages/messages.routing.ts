import { Routes, RouterModule }  from '@angular/router';
import { MessagesListComponent } from './list/messages-list.component';
import { MessagesListAnsweredComponent } from './listAnswered/messages-list-answered.component';
import { MessageEditComponent } from './edit/message-edit.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
    {
        path: 'list',
        component: MessagesListComponent,
    },
    {
        path: 'answered',
        component: MessagesListAnsweredComponent,
    },
    {
        path: 'edit/:id',
        component: MessageEditComponent,
        canActivate: [AuthGuard]
    }
];

export const routing = RouterModule.forChild(routes);