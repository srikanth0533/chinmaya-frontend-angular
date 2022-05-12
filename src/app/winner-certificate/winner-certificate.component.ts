import { Component, OnInit, Renderer2 } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../service/http.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-winner-certificate',
  templateUrl: './winner-certificate.component.html',
  styleUrls: ['./../certificate.css','./winner-certificate.component.css']
})
export class WinnerCertificateComponent implements OnInit {
  mainLoaderIs: boolean;
  refCode: any;
  participantName: any;
  participantRank: any;
  constructor(public renderer: Renderer2,
    private toastr: ToastrService,
    public http: HttpService,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.getWinnerCertificateToken();
  }
  getWinnerCertificateToken() {
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
      };
      this.http.getWinnersCertificateToken(sendData).subscribe((response) => {
        if (response.success) {
          this.participantName = response.name;
          this.participantRank = response.rank;
          if(this.participantRank == "rank1"){
            this.participantRank = "First";
          }else if(this.participantRank == "rank2"){
            this.participantRank = "Second";
          }else if(this.participantRank == "rank3"){
            this.participantRank = "Third"
          }
        } else {
          this.toastr.warning("Something went wrong!");
        }
        this.mainLoaderIs = false;
      });
    }
  }

}
