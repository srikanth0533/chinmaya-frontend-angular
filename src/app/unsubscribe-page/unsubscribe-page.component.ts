import { Component,OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../service/http.service";
import { Router, ActivatedRoute } from "@angular/router";
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-unsubscribe-page',
  templateUrl: './unsubscribe-page.component.html',
  styleUrls: ['./unsubscribe-page.component.css']
})
export class UnsubscribePageComponent implements OnInit {
  mainLoaderIs: boolean;
  isButtonClicked: boolean = false;
  refCode: any;
  participantName: any;
  participantEmailId: any;
  token:any;
  constructor(public renderer: Renderer2,
    private toastr: ToastrService,
    public http: HttpService,
    public route: ActivatedRoute,
    public router: Router) { }

 

  ngOnInit() {
    
    this.getToken()
    this. getUnsubscribeMail();
    // this.getUnbscribeParticipantData();
   
  }

  getUnsubscribeMail(){
    
    var sendData = {
      participantToken:  this.token,
      unsubscribe : this.isButtonClicked
    };
    this.http.getUnsubscribeMailData(sendData).subscribe((response) => {
      console.log(response)

      if (response.unsubscribeStatus == false) {
        console.log(response)
        this.participantName = response.name;
        this.participantEmailId = response.email;
        // this. updateUnbscribeParticipantData()
        if(this.isButtonClicked == true){
          this.toastr.success("Unsubscribed successfully!"); 
          this. updateUnbscribeParticipantData()
        }
       else{
        // this.toastr.success("Unsubscribed successfully!"); 
        // this. updateUnbscribeParticipantData()
       }

        
      } else {
        this. isButtonClicked = true;
      }
     
    });

  }
  unSubscribe(){
    this.isButtonClicked = true;
    this.updateUnbscribeParticipantData();
    this. getUnsubscribeMail()
  }
  getToken(){
    this.route.queryParamMap.subscribe((queryParams) => {
      this.refCode = queryParams.get("id");
      if (!this.refCode) {
        this.router.navigate(["**"]);
      }
    });
    if (this.refCode) {
      this.token = this.refCode;
    }
    

  }
  Subscribe(){
    this.isButtonClicked =  false;
    this.updateUnbscribeParticipantData()
   this. getUnsubscribeMail();
  
  }
  
 updateUnbscribeParticipantData() {
      var sendData = {
        participantToken: this.refCode,
        unsubscribe : this.isButtonClicked

      };
      this.http.getUnsubscribeUser(sendData).subscribe((response) => {

        if (response.success) {
          this.toastr.success("subscribed successfully!"); 
        } else {
          this.toastr.warning("Something went wrong!");
        }
       
      });
    }
  }



