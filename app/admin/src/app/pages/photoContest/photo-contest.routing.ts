import { Routes, RouterModule }  from '@angular/router';
import { PhotoContestDetailsComponent } from './details/photo-contest-details.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: PhotoContestDetailsComponent,
    }
];

export const routing = RouterModule.forChild(routes);