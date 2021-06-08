import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MsnVerificarPageRoutingModule } from './msn-verificar-routing.module';

import { MsnVerificarPage } from './msn-verificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MsnVerificarPageRoutingModule
  ],
  declarations: [MsnVerificarPage]
})
export class MsnVerificarPageModule {}
