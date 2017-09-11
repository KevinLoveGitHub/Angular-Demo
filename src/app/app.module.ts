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
import {MdGridListModule, MdCardModule, MdIconModule, MdButtonModule} from '@angular/material';
import {DetailComponent} from './detail/detail.component';
import {DataComponent} from './data/data.component';
import {FormsModule} from '@angular/forms';
import {ClickDirective} from './directive/click.directive';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CarouselComponent,
    DetailComponent,
    DataComponent,
    ClickDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    CarouselModule.forRoot(),
    AppRoutingModule,
    MdGridListModule,
    MdCardModule,
    MdIconModule,
    MdButtonModule,
  ],
  providers: [GankService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
