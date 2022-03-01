import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFavoriteAnimalPageRoutingModule } from './add-favorite-animal-routing.module';

import { AddFavoriteAnimalPage } from './add-favorite-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFavoriteAnimalPageRoutingModule
  ],
  declarations: [AddFavoriteAnimalPage]
})
export class AddFavoriteAnimalPageModule {}
