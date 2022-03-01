import { User } from './../../classes/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class EditUserPage implements OnInit {

  user: User = {} as User

  constructor(
    public userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.user = await this.userService.getUser()
  }

  async handleInputFile(event) {
    const [file] = event.target.files
    this.user.image = this.userService.loadingImage

    const fileUrl = await this.userService.uploadFile(file, 'users', `${this.user.name}-${Date.now()}`)
                          .catch(error => {
                            console.error(error)
                            this.alertError('Unexpected error, try again later')

                            this.user.image = this.userService.defaultUserImage

                            return ''
                          })

    this.user.image = fileUrl
  }

  async updateUser() {
    if (this.user.name === '') return this.alertError(`Name can't be emty`)

    await this.userService.updateUser(this.user)

    this.router.navigateByUrl('user-details')
  }

  async alertError(message) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: '',
      message,
      buttons: ['Ok']
    });

    await alert.present();
  }

}
