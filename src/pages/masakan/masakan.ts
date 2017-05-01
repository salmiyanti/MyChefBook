import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
import {IngredientService} from '../../providers/ingredient-service'

/*
  Generated class for the Masakan page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-masakan',
  templateUrl: 'masakan.html'
})
export class MasakanPage {
  public namaMasakan:any;
  constructor(public ingredientService:IngredientService, public globalService:GlobalService, public navCtrl: NavController, public navParams: NavParams) {
   this.namaMasakan = navParams.get("name");

    console.log(navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MasakanPage');
  }

  onMasakan() {
    this.navCtrl.push(MasakanPage);

  }

}
