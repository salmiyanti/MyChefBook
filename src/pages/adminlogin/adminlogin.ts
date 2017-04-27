import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AdminPage} from "../admin/admin";

/*
  Generated class for the Adminlogin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-adminlogin',
  templateUrl: 'adminlogin.html'
})
export class AdminloginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminloginPage');
  }

  onLogin(form:NgForm){
    this.navCtrl.push(AdminPage);
  }
}
