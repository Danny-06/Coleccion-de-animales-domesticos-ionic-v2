import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})

export class RecoverPasswordPage implements OnInit {

  email: string

  constructor(private authService: AuthService, private alertController: AlertController, private router: Router) {}

  ngOnInit() {}

  recoverPassword() {
    return this.authService.resetPassword(this.email)
    .then(async () => {
      await this.alertResetPassword()
      this.router.navigateByUrl('/login')
    })
    .catch(() => this.alertError())
  }

  async alertResetPassword() {
    const alert = await this.alertController.create({
      header: 'Recovered password',
      message: `You've been sent an email with a link to recover your password`,
      buttons: ['Ok']
    })

    await alert.present()
  }

  async alertError() {
    const alert = await this.alertController.create({
      header: 'Process has failed',
      message: `We couldn't send you an email to recover your password.
                Try again later.`,
      buttons: ['Ok']
    })

    await alert.present()
  }

}
