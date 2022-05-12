import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { HttpService } from "../service/http.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfigurationComponent implements OnInit {
  registrationExpiryDate:any;
  registrationExpiry:any;
  reconfirmationDate:any;
  slottingDate:any;
  registrationPurposeId:any;
confirmationPurposeId:any;
slottingPurposeId :any;
mainLoaderIs: boolean;


  constructor(private router: Router,public http: HttpService,
    private toastr: ToastrService,) { }


  ngOnInit() {
   
    this.getExpiryDate();

  }

  sendExpiryDate(type){
    this.mainLoaderIs = true;
    console.log(this.registrationExpiryDate)
    if(type=='registration'){
      var sendData = {
      purposeId : this.registrationPurposeId,
      expiryDate : this.registrationExpiryDate,
      }
    }else if(type=='confirmation'){
      var sendData = {
        purposeId : this.confirmationPurposeId,
        expiryDate : this.reconfirmationDate,
        }
    }else if(type='slotting'){
      var sendData = {
        purposeId : this.slottingPurposeId,
        expiryDate : this.slottingDate,
        }
    }
     
    // console.log(sendData);
    this.http.updateExpiryDate(sendData).subscribe((response: any) => {
      if(response){
        this.mainLoaderIs = false;
        this.getExpiryDate();
        // console.log(response);
        this.toastr.success("Updated Successfully");

      }else{
        this.mainLoaderIs = false;
        // console.log('no response');
        this.toastr.error("Something went wrong!");
      }
    })
  }
  // getExpiryDate(){
  //   this.mainLoaderIs = true;
  //   this.http.getAllExpiryDate().subscribe((response: any) => {
  //     if(response){
  //       this.mainLoaderIs = false;
  //       console.log(response);
  //       this.registrationPurposeId = response[1].purposeId;
  //       this.confirmationPurposeId = response[0].purposeId;
  //       this.slottingPurposeId = response[2].purposeId;

  //       this.registrationExpiryDate = response[1].expiryDate;
  //       console.log(this.registrationExpiryDate);
  //       this.reconfirmationDate = response[0].expiryDate;
  //       this.slottingDate = response[2].expiryDate;
        getExpiryDate(){
          this.mainLoaderIs = true;
          this.http.getAllExpiryDate().subscribe((response: any) => {
            if(response){
              this.mainLoaderIs = false;
              var regPurpose = response.find((pid) => {
                return pid.purpose.purpose === 'Registration link'
              })
              console.log(regPurpose.purposeId);
              this.registrationPurposeId = regPurpose.purposeId;
              this.confirmationPurposeId = response[0].purposeId;
              this.slottingPurposeId = response[2].purposeId;
              console.log(this.registrationPurposeId)
              this.registrationExpiryDate = regPurpose.expiryDate;
              console.log(this.registrationExpiryDate);
              this.reconfirmationDate = response[0].expiryDate;
              this.slottingDate = response[2].expiryDate;
        
      }else{
        this.mainLoaderIs = false;
        console.log('no response');
        this.toastr.error("Something went wrong!");
      }
    })
  }
 

}
