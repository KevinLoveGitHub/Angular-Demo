import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {ListComponent} from './list/list.component';
import {CarouselModule} from 'ngx-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    CarouselModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'list',
        component: ListComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
