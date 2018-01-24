import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MultiPageComponent} from './multi-page/multi-page.component';

const routes: Routes = [
  // {
  //   path: 'list/:index',
  //   component: ListComponent,
  //   data: {title: '照片列表'}
  // },
  // {
  //   path: 'carousel',
  //   component: CarouselComponent,
  //   data: {title: '首页轮播图'}
  // },
  // {
  //   path: 'detail',
  //   component: DetailComponent,
  //   data: {title: '图片详情'}
  // },
  // {
  //   path: 'preview',
  //   component: PreviewComponent,
  // },
  {
    path: 'multi-page',
    component: MultiPageComponent,
  },
  // {
  //   path: '',
  //   redirectTo: 'carousel',
  //   pathMatch: 'full',
  //   data: {title: '首页'}
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})

export class AppRoutingModule {}
