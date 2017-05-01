import { NgModule } from '@angular/core';

import {IonicApp, IonicModule} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {SQLite} from 'ionic-native';

import { ConferenceApp } from './app.component';

//import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MasakanPage } from '../pages/masakan/masakan';
//import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
//import { SupportPage } from '../pages/support/support';
import { ContactPage } from '../pages/contact/contact';
import { SearchPage } from '../pages/search/search';
import { AdminPage } from '../pages/admin/admin';
import { HomePage } from '../pages/home/home';
import { AdminloginPage } from '../pages/adminlogin/adminlogin';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

import {GlobalService} from '../providers/global-service';
import {AuthService} from '../providers/auth-service';
import {ChannelData} from '../providers/channel-data';
import {PushDataService} from '../providers/push-data-service';
import {SQLiteService} from '../providers/sql-lite-service';
import {IngredientService} from "../providers/ingredient-service";

@NgModule({
  declarations: [
    ConferenceApp,
    //AboutPage,
    AccountPage,
    LoginPage,
    //MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    //SupportPage,
    ContactPage,
    SearchPage,
    AdminPage,
    HomePage,
    AdminloginPage,
    MasakanPage,


  ],
  imports: [
    IonicModule.forRoot(ConferenceApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    //AboutPage,
    AccountPage,
    LoginPage,
    //MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    //SupportPage,
    ContactPage,
    SearchPage,
    AdminPage,
    AdminloginPage,
    MasakanPage,
    HomePage

  ],
  providers: [GlobalService, AuthService, IngredientService, ChannelData, ConferenceData, UserData, PushDataService,
    SQLiteService, SQLite, Storage]
})
export class AppModule { }
