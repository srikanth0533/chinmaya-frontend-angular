import { Component, OnInit, Renderer2 } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../service/http.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-certficate-link',
  templateUrl: './certficate-link.component.html',
  styleUrls: ['./../certificate.css']
})
export class CertficateLinkComponent implements OnInit {
  mainLoaderIs: boolean;
  refCode: any;
  participantName: any;
  constructor(public renderer: Renderer2,
    private toastr: ToastrService,
    public http: HttpService,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.getCertificateToken();
  }
  getCertificateToken() {
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
      this.http.getMobileData(sendData).subscribe((response) => {
        if (response.success) {
          this.participantName = response.participantName;
        } else {
          this.toastr.warning("Something went wrong!");
        }
        this.mainLoaderIs = false;
      });
    }
  }

  getDownloadConfirmation() {
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
        email03Confirmation: true,
        isDownloadConfirmation:true
      };
      this.http.getTokenMeeting(sendData).subscribe((data: any) => {
        if (data.success) {
         
        } else {
          this.toastr.warning("Something went wrong!");
        }
        this.mainLoaderIs = false;
      });
    }
  }
}
