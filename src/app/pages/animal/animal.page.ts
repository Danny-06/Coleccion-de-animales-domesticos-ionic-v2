import { Animal } from './../../classes/animal';
import { AnimalService } from '../../services/animal.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.page.html',
  styleUrls: ['./animal.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class AnimalPage implements OnInit {

  animal: Animal = {} as Animal

  animals: Animal[] = []

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public animalService: AnimalService) {}

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (!id) return console.log(`ID is ${id}`)

    this.animal = await this.animalService.getAnimal(id)

    if (!this.animal) return this.router.navigateByUrl('main')

    if (!this.animal.shortDescription) this.animal.shortDescription = 'Short Description no available' 
    if (!this.animal.description) this.animal.description = 'Description no available'
  }

  goTo(path: string) {
    this.router.navigateByUrl(path)
  }

}
