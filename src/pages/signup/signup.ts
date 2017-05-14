import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import {GlobalService} from "../../providers/global-service";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {username?: string, password?: string} = {};
  submitted = true;

  constructor(public navCtrl: NavController, public userData: UserData,
              public globalService:GlobalService) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.globalService.signup(this.signup).subscribe((data:any)=>{
        alert("Terima Kasih " + data.username + ". Sila log masuk untuk mencari resepi.");
        this.navCtrl.push(LoginPage);
      }, (error:any)=>{

      });
     }
  }
}
