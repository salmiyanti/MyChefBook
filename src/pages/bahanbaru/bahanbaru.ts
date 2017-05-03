import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
import {AdminPage} from "../admin/admin";
import {NgForm} from "@angular/forms";
import { UserData } from '../../providers/user-data';

/*
  Generated class for the Bahanbaru page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bahanbaru',
  templateUrl: 'bahanbaru.html'
})
export class BahanbaruPage {
  bahanbaru: {name?: string} = {};
  submitted = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserData, public globalService:GlobalService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BahanbaruPage');
  }

  onBahanbaru(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.globalService.bahanbaru(this.bahanbaru).subscribe((data:any)=>{
        alert("Bahan berjaya ditambah.");
        this.navCtrl.push(AdminPage);
      }, (error:any)=>{

      });
      /*this.userData.signup(this.signup.username);
       this.navCtrl.push(TabsPage);*/
    }
  }

}
