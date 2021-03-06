import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { LoginPage } from '../login/login';
import { SpeakerListPage } from '../speaker-list/speaker-list';
import { AdminPage } from '../admin/admin';
import { AdminloginPage } from '../adminlogin/adminlogin';
import { TutorialPage } from '../tutorial/tutorial';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  //tab1Root: any = TutorialPage;
  tab2Root: any = LoginPage;
  //tab3Root: any = AdminloginPage;
  //tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
