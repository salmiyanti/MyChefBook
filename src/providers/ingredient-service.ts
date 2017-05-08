import {Injectable} from '@angular/core';
import {Http, Headers, RequestMethod, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";
import {GlobalService} from "./global-service";

/*
 Generated class for the IngredientService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class IngredientService {

  constructor(public globalService:GlobalService, public http:Http) {
    console.log('Hello IngredientService Provider');
  }

  getIngredient(ingredient:any) {
    return Observable.create((observer:any) => {

      // At this point make a request to your backend to make a real check!
      var requestData = ({
        first: ingredient.first,
        second: ingredient.second,
        //third: ingredient.third,
      });

      // let headers = new Headers({'Content-Type': 'application/json'});
      // let options = new RequestOptions({headers: headers});

      this.http.post(this.globalService.backend.getIngredientUrl, requestData/*, options*/)
        .subscribe((responseData:any) => {
          observer.next(responseData.json());
          observer.complete();
        }, (error:any) => {
          observer.next(error);
          observer.complete();
          console.log(error);
        });
    });
  }

  getBahan() {
    return Observable.create((observer:any) => {

      // let headers = new Headers({'Content-Type': 'application/json'});
      // let options = new RequestOptions({headers: headers});

      this.http.get(this.globalService.backend.getBahanUrl /*, requestData */ /*, options*/)
        .subscribe((responseData:any) => {
          observer.next(responseData.json());
          observer.complete();
        }, (error:any) => {
          observer.next(error);
          observer.complete();
          console.log(error);
        });
    });
  }


}
