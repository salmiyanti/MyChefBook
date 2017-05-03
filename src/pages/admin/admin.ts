import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BahanbaruPage} from "../bahanbaru/bahanbaru";
import {IngredientService} from '../../providers/ingredient-service'
import {GlobalService} from "../../providers/global-service";

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
  //ingredient:any = [];

  constructor(public ingredientService:IngredientService, public globalService:GlobalService, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
  onAdmin() {
    this.submitted = true;
    this.navCtrl.push(BahanbaruPage);
      }


  /*onPilih(b:any) {
    //let loading = this.globalService.loading("Cari resepi...");
    //loading.present();

    this.ingredientService.getIngredient(b).subscribe((data:any) => {
      console.log(data);
      this.ingredient = data;
      });

   }*/

}
      /*this.userData.signup(this.signup.username);
       this.navCtrl.push(TabsPage);*/


