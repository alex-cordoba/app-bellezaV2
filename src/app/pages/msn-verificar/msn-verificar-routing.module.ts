import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MsnVerificarPage } from './msn-verificar.page';

const routes: Routes = [
  {
    path: '',
    component: MsnVerificarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MsnVerificarPageRoutingModule {}
