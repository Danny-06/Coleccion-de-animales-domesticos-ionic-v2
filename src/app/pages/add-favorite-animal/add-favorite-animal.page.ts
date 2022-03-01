import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AnimalService } from '../../services/animal.service';
import { Animal } from './../../classes/animal';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-favorite-animal',
  templateUrl: './add-favorite-animal.page.html',
  styleUrls: ['./add-favorite-animal.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class AddFavoriteAnimalPage implements OnInit {

  // Drowpdown filter
  filterOptions: {name: string}[] = [
    {name: 'all'},
    {name: 'cat'},
    {name: 'dog'},
    {name: 'parrot'}
  ]

  @Input()
  filterSelected: string = this.filterOptions[0].name

  // All animals available
  allAnimals: Animal[] = []

  // Current Animals in the UI
  animals: Animal[] = []

  favoriteAnimals: Animal[] = []

  animalIcons: { [key: string]: string } = {cat: '🐱', dog: '🐶', parrot: '🦜'}

  constructor(public animalService: AnimalService, private userService: UserService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}

  async ngOnInit() {
    this.animalService.getAnimals()
    .subscribe(animals => this.animalService.handleNextAnimals(animals, this))

    this.userService.getFavoriteAnimals()
    .subscribe(favoriteAnimals => this.favoriteAnimals = favoriteAnimals)
  }

  filterAnimals() {
    this.animals = this.animalService.filterAnimals(this.allAnimals, [], this.filterSelected)
  }

  toggleFavoriteAnimal(id: string) {
    if (this.isFavoriteAnimal(id)) this.userService.removeFavoriteAnimal(id)
    else                           this.userService.addFavoriteAnimal(id)
  }

  isFavoriteAnimal(id: string): boolean {
    const animal: Animal = this.favoriteAnimals.filter(animal => animal.id === id)[0]

    return animal != null
  }

}
