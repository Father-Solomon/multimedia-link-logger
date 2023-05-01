import {RouterModule, Routes} from '@angular/router';
import {LinkFormComponent} from './components/link-form/link-form.component';

const routes: Routes = [
  {
    path: '',
    component: LinkFormComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];
export const ResizableMediaRoutes = RouterModule.forChild(routes);
