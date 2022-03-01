import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UtilsService } from './services/utils.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  // If encapsulation mode is set to 'shadow DOM' in 'app component', then navigation will stop working
  // encapsulation: ViewEncapsulation.ShadowDom
})

export class AppComponent implements OnInit {
  constructor(private router: Router, private utils: UtilsService, public authService: AuthService) {}

  ngOnInit() {
    const customScrollbarStyleSheet = this.utils.getCSSModule('assets/css/custom-scrollbar.css')

    // Append styles to scroll container to style scrollbar
    this.router.events.subscribe(async () => {
      const shadow: any = await this.utils.getIonContentShadowRoot()
      if (shadow.adoptedStyleSheets.includes(customScrollbarStyleSheet)) return

      this.utils.attatchCSSModuleToHost(shadow, customScrollbarStyleSheet)
    })

  }

  handleBackButton(): string {
    if (this.isPath('/add-favorite-animal') || this.isPath('/edit-user')) return '/user-details'

    return 'main'
  }

  hideBackButton(): boolean {
    return !this.isPath('/login') &&
           !this.isPath('/register') &&
           !this.isPath('/main') &&
           !this.isPath('/recover-password')
  }


  isPath(path: string) {
    return this.router.url === path
  }

  goTo(path: string) {
    this.router.navigateByUrl(path)
  }
}
