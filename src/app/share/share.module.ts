import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Logger, OldLogger, ProvidersComponent} from '../providers.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProvidersComponent],
  exports: [CommonModule, FormsModule],
  // providers: [Logger, OldLogger]
})
export class SharedModule {
}
