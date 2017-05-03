import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BahanbaruPage} from "../bahanbaru/bahanbaru";

/*
  Generated class for the Admin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  submitted = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
  onAdmin() {
    this.submitted = true;

    this.navCtrl.push(BahanbaruPage);
      }


      }
      /*this.userData.signup(this.signup.username);
       this.navCtrl.push(TabsPage);*/


