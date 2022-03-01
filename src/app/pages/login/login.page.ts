import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = 'user@gmail.com'
  password: string = 'password'

  constructor(private authService: AuthService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {

  }

  async login() {
    const connectionSuccess = await this.authService.login(this.email, this.password)

    if (!connectionSuccess) return this.accountAlert()
    this.router.navigateByUrl('/main')
  }

  async accountAlert() {
    const alert = await this.alertController.create({
      header: 'Conection failed',
      subHeader: `We couldn't create your account`,
      message: `The email and password are not valid or maybe you don't have connection to internet.`,
      buttons: ['Ok']
    })

    await alert.present()
  }

}
