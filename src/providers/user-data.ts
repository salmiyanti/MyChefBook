import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs/Observable';
import {GlobalService} from './global-service';
import 'rxjs/add/operator/map';

@Injectable()
export class UserData {
  _favorites:string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  REMEMBER_ME = 'rememberMe';
  USER_DATA = 'userData';
  BACKEND_LOGIN_FIELD = 'primary_phone';
  BACKEND_PASSWORD_FIELD = 'password';

  constructor(public events:Events,
              public storage:Storage,
              public http:Http,
              public globalService:GlobalService) {
  }

  hasFavorite(sessionTimeStart:string) {
    return (this._favorites.indexOf(sessionTimeStart) > -1);
  }

  addFavorite(sessionTimeStart:string) {
    this._favorites.push(sessionTimeStart);
  }

  removeFavorite(sessionTimeStart:string) {
    let index = this._favorites.indexOf(sessionTimeStart);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  setLoginInfo(phone:string, password:string) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set(this.REMEMBER_ME, true);
    // this.setUsername(username);
    /*this.setPhone(phone);
     this.setPassword(password);
    this.events.publish('user:login');*/
  }

  refreshUserData() {
    return Observable.create((observer:any) => {
      // At this point make a request to your backend to make a real check!
      var requestData = ({
        csrf_token: '',
      });

      this.http.post(this.globalService.backend.getCurrentUserUrl, requestData)
        .subscribe((responseData:any) => {
          var userData = responseData.json().user;

          //set the current user data from backend
          this.setUserData(userData);
          this.events.publish('user:refresh');

          observer.next(true);
          observer.complete();

        }, (error:any) => {
          console.log(error);
        });

    });
  }

  setUserData(data:any) {
    this.storage.set(this.USER_DATA, data);
  }

  getUserData() {
    return this.storage.get(this.USER_DATA).then((data:any)=> {
      return data;
    });
  }

  getUserId() {
    return this.storage.get(this.USER_DATA).then((data)=> {
      return data.id;
    });
  }

  /* getUsername() {
    return this.storage.get(this.USER_DATA).then((data)=> {
      return data.username;
    });
  }*/


  getPhoneNumber() {
    return this.storage.get(this.USER_DATA).then((data)=> {
      return data.primary_phone;
    });
  }

  getAvatar() {
    return Observable.create((observer:any)=> {
      this.storage.get(this.USER_DATA).then((data)=> {

        var requestData:any = {
          user_id: data.id
        };
        this.http.post(this.globalService.backend.getAvatarUrl, requestData).subscribe((responseData:any)=> {
          observer.next(responseData._body);
          observer.complete();
        }, (error:any)=> {
          return Observable.throw(error);
        });

      });


    });
  }

  login(username:string) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  };

  adminlogin(username:string) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:adminlogin');
  };



  signup(username:string) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('adminuser:signup');
  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setUsername(username:string) {
    this.storage.set('username', username);
  };

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((data) => {
      return data === true;
    });
  }

  checkHasSeenTutorial() {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((data) => {
      return data;
    })
  }

}
