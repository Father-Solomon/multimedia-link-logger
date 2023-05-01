import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'media',
    loadChildren: () => import('./features/resizable-media/resizable-media.module').then(m => m.ResizableMediaModule),
    data: {
      breadcrumb: {
        label: 'Home',
        info: 'home'
      }
    }
  },
  {
    path: '',
    redirectTo: 'media',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
