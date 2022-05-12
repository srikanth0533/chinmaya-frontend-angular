import { Component, OnInit, Renderer2 } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../service/http.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-winner-link',
  templateUrl: './winner-link.component.html',
  styleUrls: ['./winner-link.component.css']
})
export class WinnerLinkComponent implements OnInit {
  mainLoaderIs: boolean;
  meetingLink: any;
 
  constructor(public renderer: Renderer2,
    private toastr: ToastrService,
    public http: HttpService,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.joinSession();
  }
  joinSession() {
    
      this.mainLoaderIs = true;
      
      this.http.getPrizeDistributionLink().subscribe((response: any) => {
        if (response.success) {
          this.meetingLink = response.meetingLink;
         
        } else {
          this.toastr.warning("Session yet not started!");
        }
        this.mainLoaderIs = false;
      });
    
  }
    openZoomLink() {
      window.open(this.meetingLink, "_blank");
    }
}
