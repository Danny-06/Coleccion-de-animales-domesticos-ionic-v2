import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Animal } from 'src/app/classes/animal';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.page.html',
  styleUrls: ['./add-animal.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class AddAnimalPage implements OnInit {

  types: string[] = ['dog', 'cat', 'parrot']

  animal: Animal = {...new Animal()}

  constructor(private alertController: AlertController, public animalService: AnimalService, private router: Router) {
    this.animal.type = this.types[0]
  }

  ngOnInit() {
    // Overrides 'focus' method of 'HTMLElement' to avoid 'ion-select' autofocus 1st input after closing modal
    HTMLElement.prototype.focus = function() {}
  }

  async handleInputFile(event) {
    const [file] = event.target.files
    this.animal.image = this.animalService.loadingImage

    const fileUrl = await this.animalService.uploadFile(file, 'animals', `${this.animal.name}-${Date.now()}`)
                          .catch(error => {
                            console.error(error)
                            this.alertError('Unexpected error, try again later')

                            this.animal.image = this.animalService.defaultAnimalImage

                            return ''
                          })

    this.animal.image = fileUrl
  }

  addAnimal() {
    const {name, image} = this.animal
    if (!name) return this.alertError(`Animal name can't be empty`)
    if (!image) return this.alertError(`Animal image can't be empty`)

    this.animalService.addAnimal(this.animal)
    .then(() => this.router.navigateByUrl('/main'))
    .catch(error => {
      console.error(error)
      this.alertError(`Sorry, an unexpected error ocurred, we coudn't create your animal`)
    })
  }

  async alertError(message: string) {
    const ionAlert = await this.alertController.create({
      header: 'Error',
      subHeader: `We couldn't create your animal`,
      message,
      buttons: ['Ok']
    })

    await ionAlert.present()
  }

}
