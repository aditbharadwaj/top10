import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowlistpagePage } from './showlistpage.page';

const routes: Routes = [
  {
    path: '',
    component: ShowlistpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowlistpagePageRoutingModule {}
