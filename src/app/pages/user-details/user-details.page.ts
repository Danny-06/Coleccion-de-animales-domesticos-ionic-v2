import { User } from './../../classes/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Animal } from 'src/app/classes/animal';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class UserDetailsPage implements OnInit {

  user: User = {} as User

  animals: Animal[] = []

  animalIcons: { [key: string]: string } = {cat: '🐱', dog: '🐶', parrot: '🦜'}

  favoriteAnimalsIds: string[] = []

  constructor(
    private authService: AuthService,
    public userService: UserService,
    private animalService: AnimalService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.animalService.getAnimals()
    .subscribe(animals => this.animals = animals)

    this.userService.getFavoriteAnimals()
    .subscribe(favoriteAnimals => this.favoriteAnimalsIds = favoriteAnimals.map(animal => animal.id))
  }

  async ngOnInit() {
    this.user = await this.userService.getUser()
    console.log(this.user)
  }

  getUserAnimalCount() {
    const favoriteAnimals = this.animals.filter(animal => this.favoriteAnimalsIds.includes(animal.id))

    const cats    = favoriteAnimals.filter(a => a.type === 'cat').length
    const dogs    = favoriteAnimals.filter(a => a.type === 'dog').length
    const parrots = favoriteAnimals.filter(a => a.type === 'parrot').length
    
    return {cats, dogs, parrots}
  }

  goToAddFavoriteAnimal() {
    this.router.navigateByUrl(`/add-favorite-animal`)
  }


  goToEditUser() {
    this.router.navigateByUrl('edit-user')
  }

}
