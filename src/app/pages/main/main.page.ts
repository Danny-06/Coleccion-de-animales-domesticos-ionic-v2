import { Router } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { Animal } from './../../classes/animal';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class MainPage implements OnInit {

   // Drowpdown filter
   filterOptions: {name: string}[] = [
    {name: 'all'},
    {name: 'cat'},
    {name: 'dog'},
    {name: 'parrot'},
    {name: 'favorite'}
  ]

  @Input()
  filterSelected: string = this.filterOptions[0].name

  // All animals available
  allAnimals: Animal[] = []

  // Current Animals in the UI
  animals: Animal[] = []

  // Favorite Animal of user
  favoriteAnimals: Animal[] = []

  animalIcons: { [key: string]: string } = {cat: '🐱', dog: '🐶', parrot: '🦜'}

  constructor(public animalService: AnimalService, private router: Router, private userService: UserService) {}

  async ngOnInit() {
    this.animalService.getAnimals()
    .subscribe(animals => this.animalService.handleNextAnimals(animals, this))

    this.userService.getFavoriteAnimals()
    .subscribe(favoriteAnimalsId => {
      const animalsIds: string[] = favoriteAnimalsId.map(animal => animal.id)
      this.favoriteAnimals = this.animals.filter(animal => animalsIds.includes(animal.id))
    })
  }

  filterAnimals() {
    this.animals = this.animalService.filterAnimals(this.allAnimals, this.favoriteAnimals, this.filterSelected)
  }

  goTo(path: string) {
    this.router.navigateByUrl(path)
  }

}
