import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ListComponent} from './list/list.component';
import {CarouselModule} from 'ngx-bootstrap';
import {CarouselComponent} from './carousel/carousel.component';
import {GankService} from './gank.service';
import {AppRoutingModule} from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule.forRoot(),
    AppRoutingModule
  ],
  providers: [GankService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
