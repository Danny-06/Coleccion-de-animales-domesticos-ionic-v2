import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  name: string
  description: string
  email: string
  password: string

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {}

  async register() {
    if (this.name === '') return this.emptyNameError()

    this.authService.register(this.email, this.password)
    .then(() => {
      const {uid} = this.authService.getCurrentUser()
      const user = {id: uid, name: this.name, details: this.description} as User
      this.userService.addUser(user)

      this.router.navigateByUrl('/main')
    })
    .catch(() => this.accountAlert())
  }

  async emptyNameError() {
    const alert = await this.alertController.create({
      header: 'Empty Name',
      subHeader: `We couldn't create your account`,
      message: 'A name must be provided.',
      buttons: ['Ok']
    })

    await alert.present()
  }

  async accountAlert() {
    const alert = await this.alertController.create({
      header: 'Conection failed',
      subHeader: `We couldn't create your account`,
      message: 'The email and password are not valid.',
      buttons: ['Ok']
    })

    await alert.present()
  }

}
