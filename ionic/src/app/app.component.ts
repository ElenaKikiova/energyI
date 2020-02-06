import { Component, Sanitizer } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public lang = this.languageService.current;

  public menuWidths = {
    "collapsed": 50,
    "expanded": 200
  }

  public menuWidth = this.menuWidths.collapsed;

  public appPages = [
    {
      title: 'Начало',
      url: '/home',
      icon: 'home',
      color: 'quaternary'
    },
    {
      title: this.lang.balancePage,
      url: '/balance',
      icon: 'restaurant',
      color: 'secondary'
    },
    {
      title: this.lang.diaryPage,
      url: '/diary',
      icon: 'book',
      color: 'tertiary'
    },
    {
      title: this.lang.productsPage,
      url: '/products',
      icon: 'nutrition',
      color: 'primary'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService: LanguageService,
    private sanitizer: Sanitizer
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  toggleMenu(){
    if(this.menuWidth == this.menuWidths.collapsed) this.menuWidth = this.menuWidths.expanded;
    else this.menuWidth = this.menuWidths.collapsed;
  }

  closeMenu(){
    this.menuWidth = this.menuWidths.collapsed;
  }
}
