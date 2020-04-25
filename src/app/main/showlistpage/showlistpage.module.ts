import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowlistpagePageRoutingModule } from './showlistpage-routing.module';

import { ShowlistpagePage } from './showlistpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowlistpagePageRoutingModule
  ],
  declarations: [ShowlistpagePage]
})
export class ShowlistpagePageModule {}
