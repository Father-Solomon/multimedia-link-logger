import {RouterModule, Routes} from '@angular/router';
import {ResizableMediaComponent} from "./resizable-media.component";

const routes: Routes = [
  {
    path: '',
    component: ResizableMediaComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];
export const ResizableMediaRoutes = RouterModule.forChild(routes);
