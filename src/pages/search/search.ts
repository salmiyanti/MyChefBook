import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {IngredientService} from '../../providers/ingredient-service'
import {GlobalService} from "../../providers/global-service";
/*
 Generated class for the Search page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  ingredient:{first?:string, second?:string, third?:string};
  recipes:any = [];

  constructor(public ingredientService:IngredientService, public globalService:GlobalService, public navCtrl:NavController, public navParams:NavParams) {
    this.ingredient = {first: 'Ikan Pari', second: 'Bunga Kantan', third: 'Cili Kering'};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  onSearch() {
    let loading = this.globalService.loading("Searching...");
    loading.present();

    this.ingredientService.getIngredient(this.ingredient).subscribe((data:any) => {
      // console.log(data);
      this.recipes = data;
      data.forEach((recipe:any, val:any)=> {
        console.log(recipe.name);
      });

    });

    loading.dismiss();
  }

}
