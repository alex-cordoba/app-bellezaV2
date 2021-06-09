import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from "ngx-spinner";

import { MsnVerificarPageRoutingModule } from './msn-verificar-routing.module';

import { MsnVerificarPage } from './msn-verificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MsnVerificarPageRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [MsnVerificarPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MsnVerificarPageModule {}
