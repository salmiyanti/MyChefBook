import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

//import { SignupPage } from '../signup/signup';
//import { TabsPage } from '../tabs/tabs';
//import { SearchPage } from '../search/search';
import { AdminPage } from '../admin/admin';
import { UserData } from '../../providers/user-data';
import {GlobalService} from '../../providers/global-service';


@Component({
  selector: 'page-user',
  templateUrl: 'adminlogin.html'
})
export class AdminloginPage {
  adminlogin: {username?: string, password?: string} = {};
  submitted = true;
  private data:any;

  constructor(public navCtrl: NavController, public userData: UserData, public globalService:GlobalService) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.globalService.adminlogin(this.adminlogin).subscribe((data:any)=>{
          if(data.hasOwnProperty('username')){
            alert("Hello " + data.username);
            //this.userData.setId(data.id);
            this.userData.adminlogin(data);
            this.navCtrl.push(AdminPage);
          }else
            alert("Ralat! Sila masukkan semula data admin.");
        },
        (error:any)=>{

        });
    }
  }

  /*onSignup() {
    this.navCtrl.push(SignupPage);
  }*/
}
