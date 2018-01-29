import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MultiPageComponent} from './multi-page/multi-page.component';
import {PreviewComponent} from './preview/preview.component';

const routes: Routes = [
  {
    path: 'multi-page',
    component: MultiPageComponent,
  },
  {
    path: 'preview',
    component: PreviewComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
