import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BahanbaruPage} from "../bahanbaru/bahanbaru";
import {IngredientService} from '../../providers/ingredient-service'
import {GlobalService} from "../../providers/global-service";
import {NgForm} from "@angular/forms";


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
  item: {name?: string, methods?: string} = {};

  bahan:any = [];

  constructor(public ingredientService:IngredientService, public globalService:GlobalService, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
    this.ingredientService.getBahan().subscribe((data:any) => {
      console.log(data);
      this.bahan = data;
      data.forEach((bahan:any, val:any)=> {
        console.log(bahan.name);
      });

    });
  }
  onAdmin() {
    this.submitted = true;
    this.navCtrl.push(BahanbaruPage);
      }

  onSimpan(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.globalService.resepibaru(this.item).subscribe((data:any)=>{
        alert("Resepi berjaya ditambah.");
        this.navCtrl.push(AdminPage);
      }, (error:any)=>{

      });
      /*this.userData.signup(this.signup.username);
       this.navCtrl.push(TabsPage);*/
    }
  }

}
      /*this.userData.signup(this.signup.username);
       this.navCtrl.push(TabsPage);*/


