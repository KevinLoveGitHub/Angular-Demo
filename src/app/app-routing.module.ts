import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListComponent} from './list/list.component';
import {CarouselComponent} from './carousel/carousel.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'carousel',
    component: CarouselComponent
  },
  {
    path: '',
    redirectTo: 'carousel',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
