import { Component } from '@angular/core';

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

  public appPages = [
    {
      title: 'Начало',
      url: '/home',
      icon: 'home'
    },
    {
      title: this.lang.balancePage,
      url: '/balance',
      icon: 'restaurant'
    },
    {
      title: this.lang.diaryPage,
      url: '/diary',
      icon: 'book'
    },
    {
      title: this.lang.productsPage,
      url: '/products',
      icon: 'nutrition'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService: LanguageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
