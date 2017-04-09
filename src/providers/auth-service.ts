import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs/Observable';
import {UserData} from './user-data';
import {PushDataService} from './push-data-service';
import {GlobalService} from './global-service';
import {ChannelData} from '../providers/channel-data';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(public http:Http, public pushData:PushDataService, public globalService:GlobalService,
              public storage:Storage, public userData:UserData, public chanData:ChannelData) {
  }

  public login(credentials:any) {
    if (credentials.phone === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create((observer:any) => {
        // At this point make a request to your backend to make a real check!
        var requestData = ({
          primary_phone: credentials.phone.trim(),
          password: credentials.password.trim()
        });
        this.http.post(this.globalService.backend.loginUrl, requestData)
          .subscribe((responseData:any) => {
            var userData = responseData.json().user;

            //set the current user data from backend
            this.userData.setUserData(userData);
            console.log(userData);

            //set the current user session id from backend
            this.globalService.setStorage('session_id', userData.session_id);
            this.globalService.getStorage('session_id').then((session_id)=> {
              console.log(session_id);
            });
            //set the current user csrf token from backend
            this.globalService.setStorage('csrf_token', userData.csrf_token);
            this.globalService.getStorage('csrf_token').then((csrf_token)=> {
              console.log(csrf_token);
            });

            var isValid:boolean = (credentials.phone === userData.primary_phone);
            this.userData.events.publish('user:login');

            observer.next(isValid);
            observer.complete();

          }, (error:any) => {
            observer.next(false);
            observer.complete();
            console.log(error);
          });

      });
    }
  }

  public signup(credentials:any) {
    if (credentials.phone === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else if (credentials.phone !== credentials.confirmpassword) {
      return Observable.throw("Password does not match");
    }
    else {
      // At this point store the credentials to your backend!
      /*this.storage.set(this.HAS_LOGGED_IN, true);
       this.setUsername(username);*/
      this.userData.events.publish('user:signup');

      return Observable.create((observer:any) => {
        observer.next(true);
        observer.complete();
      });
    }

  };

  public logout() {
    return Observable.create((observer:any) => {
      this.userData.storage.remove(this.userData.HAS_LOGGED_IN);
      this.userData.storage.remove('username');
      this.userData.storage.clear();
      this.userData.events.publish('user:logout');
      this.globalService.storage.clear();

      observer.next(true);
      observer.complete();
    });
  };

}
