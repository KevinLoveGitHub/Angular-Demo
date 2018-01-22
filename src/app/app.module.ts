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
import {MdButtonModule, MdCardModule, MdGridListModule, MdIconModule} from '@angular/material';
import {DetailComponent} from './detail/detail.component';
import {DataComponent} from './data/data.component';
import {FormsModule} from '@angular/forms';
import {ClickDirective} from './directive/click.directive';
import {SexPipe} from './pipes/sex.pipe';
import {Logger, NewLogger, OldLogger, silentLogger} from './providers.component';
import {APP_CONFIG, HERO_DI_CONFIG} from './app-config';
import {DragComponent} from './drag/drag.component';
import { PageComponent } from './page/page.component';
import { SelectComponent } from './select/select.component';
import { AvailableViewComponent } from './available-view/available-view.component';
import {HttpClientModule} from '@angular/common/http';
import { MultiPageComponent } from './multi-page/multi-page.component';
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CarouselComponent,
    DetailComponent,
    DataComponent,
    ClickDirective,
    SexPipe,
    DragComponent,
    PageComponent,
    SelectComponent,
    AvailableViewComponent,
    MultiPageComponent,
    // ProvidersComponent
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
    HttpClientModule,
    // SharedModule
  ],
  providers: [
    GankService,
    {provide: APP_CONFIG, useValue: HERO_DI_CONFIG},
    {provide: Logger, useClass: NewLogger},
    {provide: OldLogger, useExisting: Logger},
    {provide: silentLogger, useValue: silentLogger},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

