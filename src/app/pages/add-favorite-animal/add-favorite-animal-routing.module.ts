import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFavoriteAnimalPage } from './add-favorite-animal.page';

const routes: Routes = [
  {
    path: '',
    component: AddFavoriteAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFavoriteAnimalPageRoutingModule {}
