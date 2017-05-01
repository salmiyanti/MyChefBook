import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {IngredientService} from '../../providers/ingredient-service'
import {GlobalService} from "../../providers/global-service";
import  {MasakanPage} from "../../pages/masakan/masakan";
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

  recipe:string;
  ingredient:{first?:string, second?:string, third?:string};
  recipes:any = [];

  constructor(public ingredientService:IngredientService, public globalService:GlobalService, public navCtrl:NavController, public navParams:NavParams) {
    this.ingredient = {first: '', second: '', third: ''};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }



  onSearch() {
    let loading = this.globalService.loading("Cari resepi...");
    loading.present();

    this.ingredientService.getIngredient(this.ingredient).subscribe((data:any) => {
      console.log(data);
      this.recipes = data;
      data.forEach((recipe:any, val:any)=> {
        console.log(recipe.name);
      });

    });

    loading.dismiss();
  }

  onMasakan(item: any) {
    
    this.navCtrl.push(MasakanPage, item);

  }

}
