import { Component, OnInit, Renderer2 } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../service/http.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-un-subscribe',
  templateUrl: './un-subscribe.component.html',
  styleUrls: ['./un-subscribe.component.css']
})
export class UnSubscribeComponent implements OnInit {
  mainLoaderIs: boolean;
  isButtonClicked: boolean = false;
  refCode: any;
  participantName: any;
  participantEmail: any;
  constructor(public renderer: Renderer2,
    private toastr: ToastrService,
    public http: HttpService,
    public route: ActivatedRoute,
    public router: Router) { }

    ngOnInit() {
      this.getUnbscribeParticipant();
    }
    unSubscribe(){
      this.isButtonClicked = true;
      this.getUnbscribeParticipant();
    }
    getUnbscribeParticipant() {
      this.route.queryParamMap.subscribe((queryParams) => {
        this.refCode = queryParams.get("id");
        if (!this.refCode) {
          this.router.navigate(["**"]);
        }
      });
      if (this.refCode) {
        this.mainLoaderIs = true;
        var sendData = {
          token: this.refCode,
          unsubscribe : this.isButtonClicked
        };
        this.http.getUnsubscribe(sendData).subscribe((response) => {
          if (response.success) {
            this.participantName = response.name;
            this.participantEmail = response.email;
            if(this.isButtonClicked == true){
              this.toastr.success("Unsubscribed successfully!"); 
            }
          } else {
            this.toastr.warning("Something went wrong!");
          }
          this.mainLoaderIs = false;
        });
      }
    }
  
}
