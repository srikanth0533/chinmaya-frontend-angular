import { Component, OnInit } from '@angular/core';
import { HttpService } from "../service/http.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration-close',
  templateUrl: './registration-close.component.html',
  styleUrls: ['./registration-close.component.css']
})
export class RegistrationCloseComponent implements OnInit {
  registrationExpiryStatus:any;
  constructor(private router: Router,public http: HttpService,
    private toastr: ToastrService,) { }

    ngOnInit() {
      this.getExpiryDate();
      setInterval(() => {
        this.getExpiryDate();
      }, 10000);
    }
    getExpiryDate(){
      this.http.getAllExpiryDate().subscribe((response: any) => {
        if(response){
          console.log(response);
          this.registrationExpiryStatus = response[1].expiry
          if(this.registrationExpiryStatus == false){
            this.router.navigate(["registrationForm"]);
  
          }
         
        }else {
          this.toastr.error("Something went wrong!");
        }
      })
    }
 
  

}
