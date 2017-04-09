import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {GlobalService} from './global-service';
import {SQLiteService} from './sql-lite-service';
import {UserData} from './user-data';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
 Generated class for the PushDataService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class PushDataService {
  PUSH_TOKEN = 'gcm_registration_id';
  PUSH_DATA = 'pushData';
  data:any = [];
  cData:any;

  constructor(public storage:Storage, public http:Http,
              public userData:UserData,
              public sqlService:SQLiteService,
              public globalService:GlobalService) {
  }

  setDeviceToken(data:string) {
    this.storage.set(this.PUSH_TOKEN, data);
  }

  getDeviceToken() {
    return this.storage.get(this.PUSH_TOKEN).then((data:any)=> {
      return data;
    });
  }


  public updateGCMRegistrationId(registrationId?:any) {
    return Observable.create((observer:any) => {

      this.userData.getUserId().then((user_id:any)=> {
        // At this point make a request to your backend to make a real check!
        var requestData = ({
          gcm_registration_id: registrationId,
          id: user_id
        });

        this.globalService.backend.updateGcmIdUrl = this.globalService.backend.updateGcmIdUrl.replace(/\{\{id\}\}/gi, user_id);
        this.http.post(this.globalService.backend.updateGcmIdUrl, requestData)
          .subscribe((responseData:any) => {
            // var userData = responseData.json().user;
            observer.next(responseData);
            observer.complete();

          }, (error:any) => {
            observer.next(error);
            observer.complete();
            console.log(error);
          });

      });

    });
  }

  /*
   * for testing purposes
   * */
  getData() {
    return Observable.create((observer:any) => {
      this.userData.getPhoneNumber().then((data:any)=> {
        /*
         * template data
         * */
        var requescData = ({
          primary_phone: data,
        });
        this.http.post(this.globalService.backend.getPushDataUrl, requescData)
          .subscribe((responseData:any) => {
            var data:any = /*JSON.stringify*/(responseData.json().data);
            /*this.set(data).then(()=> {
             observer.next(data);
             observer.complete();
             });*/
            this.sqlService.insert('push', ['data', 'created_at'], [JSON.stringify(data), this.globalService.getLocalISOTimeString()]).then(()=> {
              observer.next(data);
              observer.complete();
            });
          }, (error:any) => {
            observer.next(error);
            observer.complete();
            console.log(error);
          });
        /*
         * template data
         * */
      });
    });
  }

  set(data:any) {
    return this.storage.set(this.PUSH_DATA, /*JSON.stringify*/(data)).then((data:any)=> {
      console.log(data);
    });
  }

  get():any {
    return Observable.create((observer:any) => {
      this.queryData().then((data:any)=> {
        // this.globalService.modal(JSON.stringify(this.data), "GET DATA").present();
        observer.next(data);
        observer.complete();
      });
    });
    /*return Observable.create((observer:any) => {
     this.storage.get(this.PUSH_DATA).then((data:any)=> {
     observer.next(data);
     observer.complete();
     }, (reason:any)=> {
     observer.next(false);
     observer.complete();
     console.log(reason);
     });
     });*/
  }

  queryData():any {
    return this.sqlService.query('SELECT * FROM push ORDER BY id DESC').then((resData:any)=> {
      if (resData) {

        var $this = this;
        var day = 0;

        //hold the first data row
        $this.data = JSON.parse(resData.rows.item(0).data);

        for (var i = 1; i < resData.rows.length && day < 7; i++) {
          $this.cData = JSON.parse(resData.rows.item(i).data);// current data loop
          //push into schedule
          let dayIndex = $this.data.schedule.find((day:any)=>day.date == $this.cData.schedule[0].date);
          if (dayIndex) {//day found
            let groupIndex = dayIndex.groups.find((g:any)=>g.time == $this.cData.schedule[0].groups[0].time);
            if (groupIndex) {//time found
              groupIndex.sessions.push($this.cData.schedule[0].groups[0].sessions[0]);
            } else {//time not found
              dayIndex.groups.push($this.cData.schedule[0].groups[0]);
            }
          } else {//day not found
            //TODO: add new day
            $this.data.schedule.push($this.cData.schedule[0]);
            day++;
            // this.globalService.alert("New Day", JSON.stringify(this.cData.schedule[i])).present();
          }

          //push into speakers
          $this.data.speakers = $this.data.speakers.filter(function (speaker:any) {
            return speaker.stationNumber !== $this.cData.speakers[0].stationNumber;
          });
          $this.data.speakers.push($this.cData.speakers[0]);

          //push into maps
          $this.data.map = $this.data.map.filter(function (map:any) {
            return map.stationNumber !== $this.cData.map[0].stationNumber;
          });
          $this.data.map.push($this.cData.map[0]);

          // this.globalService.modal(JSON.stringify(this.data), "SELECT " + i).present();
        }

        return this.data;
      }
    });
  }

  /*pushMsg(responseData:any) {
   this.data = responseData;//response data
   /!*return this.storage.get(this.PUSH_DATA).then((data:any)=> {
   var i = 0;

   let dayIndex = data.schedule.find((day:any)=>day.date == this.data.schedule[i].date);
   if (dayIndex) {//day found
   let groupIndex = dayIndex.groups.find((g:any)=>g.time == this.data.schedule[i].groups[i].time);
   if (groupIndex) {//time found
   groupIndex.sessions.push(this.data.schedule[0].groups[i].sessions[i]);
   } else {//time not found
   dayIndex.groups.push(this.data.schedule[0].groups[i]);
   }
   } else {//day not found
   //TODO: add new day
   data.schedule.push(this.data.schedule[i]);
   }
   this.set(data);
   }, (reason:any)=> {
   console.log(reason);
   });*!/
   }*/

}
