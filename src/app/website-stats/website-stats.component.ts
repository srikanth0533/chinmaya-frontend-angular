import { Component, OnInit, Renderer2 } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../service/http.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-website-stats',
  templateUrl: './website-stats.component.html',
  styleUrls: ['./website-stats.component.css']
})
export class WebsiteStatsComponent implements OnInit {
  mainLoaderIs: boolean;
  isButtonClicked: boolean = false;
  refCode: any;
  constructor(public renderer: Renderer2,
    private toastr: ToastrService,
    public http: HttpService,
    public route: ActivatedRoute,
    public router: Router) { }

    ngOnInit() {
      this.getWebsiteParticipant();
    }
    
    getWebsiteParticipant() {
      
      this.route.queryParamMap.subscribe((queryParams) => {
        this.refCode = queryParams.get("id");
        if (!this.refCode) {
          this.router.navigate(["**"]);
        }
      });
      if (this.refCode) {
        this.isButtonClicked = true;
        this.mainLoaderIs = true;
        var sendData = {
          token: this.refCode,
          website_status : this.isButtonClicked
        };
        this.http.getWebsite(sendData).subscribe((response) => {
          if (response.success) {
            this.mainLoaderIs = false;
              window.open("http://www.chinmayamissionthane.in/projects.htm", '_self');
            
          } else {
            this.mainLoaderIs = false;
            this.toastr.warning("Something went wrong!");
          }
          this.mainLoaderIs = false;
        });
      }
    }
  
}
