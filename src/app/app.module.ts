import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import 'hammerjs';

import {AppComponent} from './app.component';
import {ListComponent} from './list/list.component';
import {CarouselModule} from 'ngx-bootstrap';
import {CarouselComponent} from './carousel/carousel.component';
import {GankService} from './gank.service';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdGridListModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    CarouselModule.forRoot(),
    AppRoutingModule,
    MdGridListModule
  ],
  providers: [GankService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
