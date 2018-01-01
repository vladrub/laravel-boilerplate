import { Routes, RouterModule }  from '@angular/router';
import { DemoComponent } from './demo.component';

const routes: Routes = [
    {
        path: '',
        component: DemoComponent
    }
];

export const routing = RouterModule.forChild(routes);