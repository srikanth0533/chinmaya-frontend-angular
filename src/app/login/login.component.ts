import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpService } from "../service/http.service";
import { ToastrService } from "ngx-toastr";
import{AppComponent} from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isUserLogin: any = {};
  constructor(private router: Router, public http: HttpService, private toastr: ToastrService, public app: AppComponent) {
    // this.isPatterns = this.getPatterns();
    this.isUserLogin.email = "";
  }
  isPatterns: any;
  mainLoaderIs: boolean;
  ngOnInit() {
  }

  // getPatterns() {
  //   var isPatterns = {
  //     alpha: "^[a-zA-Z ]*$",
  //     alphaNumeric: "^[a-zA-Z0-9]{10,12}$",
  //     alphaNumericSpl: "[a-zA-Z0-9]{10,12}$",
  //     alphaSpl: "[a-zA-Z |-]*",
  //     numeric: "^[0-9]{10,12}$",
  //     numericSpl: "[0-9 |-]*",
  //     mobileNo: "^[0-9]{10,12}$",
  //     pincode: "^[0-9]{6,8}$",
  //     emailOld: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$",
  //     email: "[a-z0-9._]+[@]{1}[a-z0-9]+[.]{1}[a-z]{2,10}$"
  //   };
  //   return isPatterns;
  // }


  // userLogin() {
    
  //     var isSendData = {
  //       apiName: "login",
        
  //         "email": this.isUserLogin.email,
  //         "password": this.isUserLogin.password
        
  //     }
  //     this.mainLoaderIs = true;
  //     this.http.getLogin(isSendData).subscribe(
  //       (response) => {
  //         this.mainLoaderIs = false;
  //         var loginData = response;
  //         if (loginData.success) {
             
  //           sessionStorage.setItem("userData", loginData.userName);
  //           this.toastr.success("Welcome");
  //           this.router.navigate(['paymentDashboard']);
  //         } else {
  //           this.toastr.error("Incorrect Email or password");
  //         }
  //       });
    
  // }

  userLogin() {
    
      var isSendData = {
          username: this.isUserLogin.email,
          password: this.isUserLogin.password
        
      }
      this.mainLoaderIs = true;
      this.http.login(isSendData).subscribe(
        (response) => {
          this.mainLoaderIs = false;
          var loginData = response;
          if (loginData) {
             
            sessionStorage.setItem("userData",JSON.stringify(loginData));
            // this.finalMultiparticipantList = JSON.parse(sessionStorage.getItem("userData"));
            if(loginData.message){
              this.toastr.error(loginData.message);
            }else{
              this.toastr.success("Logged in successfully!");
            }
            
            this.router.navigate(['paymentDashboard']);
            this.app.startTimer();
          } else {
            this.toastr.error("Incorrect Email or password");
          }
        });
    
  }
}
