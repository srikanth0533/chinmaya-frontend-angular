import { Component, OnInit,ViewEncapsulation } from "@angular/core";
import { HttpService } from "../service/http.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl,
} from "@angular/platform-browser";

@Component({
  selector: 'app-payment-link',
  templateUrl: './payment-link.component.html',
  styleUrls: ['../registration-form/registration-form.component.css','./payment-link.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentLinkComponent implements OnInit {
  mainLoaderIs: boolean = false;
  showPayment: boolean = true;
  url: any;
 isUrl: boolean = false;
 formDataCovertedInObject: any;
trackId: any;
 showPaymentInfo: boolean = false;
 amountPaidByUser: any = "Rs  ";
showSuccess: boolean = false;
modeTransaction: any;
sumAmount: any;
refCode: any;
  formSubmit: boolean;
  msg: any;
  participantPayId: any;
  ids: any;
  paymentPendingList: any=[];
  toBePaidAmount: any;
  constructor(private router: Router,
    public http: HttpService,
    private toastr: ToastrService,
    protected sanitizer: DomSanitizer, public route: ActivatedRoute) { }

  ngOnInit() {
    this.getPendingPaymentUser();
  }
  getPendingPaymentUser() {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.refCode = queryParams.get("participantToken");
      if (!this.refCode) {
        this.router.navigate(["**"]);
      }
    });
    if (this.refCode) {
      this.mainLoaderIs = true;
      var sendData = {
        participantToken: this.refCode,
        // participantToken:"F3Zsb223"
      };
      this.http.getPaymentUserData(sendData).subscribe((response: any) => {
        this.mainLoaderIs = false;
        if (response) {
          this.paymentPendingList = response;
          if(this.paymentPendingList.length != 0 ){
            console.log(this.paymentPendingList);
            this.toBePaidAmount = this.paymentPendingList[0].school.reg_fees;
            this.ids = response.map((ele) => {
              return ele.id;
            });
            this.participantPayId = response.id
          }else{
            this.mainLoaderIs = false;
            this.toastr.warning("No Data!");
          }
        } else {
          this.mainLoaderIs = false;
          this.toastr.warning("Something went wrong!");
        }
       
      });
    }
  }



 selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = "You must select an image";
      this.toastr.error(this.msg);
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      this.toastr.error(this.msg);
      return;
    }

    var reader: any = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    if (event.target.files.length > 0) {
      this.formDataCovertedInObject = new FormData();
      this.formDataCovertedInObject.append("image", event.target.files[0]);
    }
    // console.log(this.formDataCovertedInObject);
    reader.onload = (_event: any) => {
      this.isUrl = true;
      this.msg = "";
      // console.log(reader.result);
      this.url = this.sanitizer.bypassSecurityTrustUrl(reader.result);
      // console.log(this.url);
    };
  }
  removeImage(){
    this.isUrl = false;
    var getValue = document.getElementById('file') as HTMLInputElement;
    getValue.value = "";
    // console.log(getValue);
  }
  saveImgInfo() {
    this.formDataCovertedInObject.append("id", this.participantPayId);

    this.mainLoaderIs = true;
    this.http
      .sendImgRefID(this.formDataCovertedInObject)
      .subscribe((response: any) => {
        if (response) {
          this.mainLoaderIs = false;
          console.log(response);
          this.toastr.success("Data recorded successfully!");
        } else {
          this.toastr.error("Something went wrong!");
          this.showPaymentInfo = true;
        }
      });
  }
 
  checkPaymentValidation() {
    if (this.showPaymentInfo) {
      this.formSubmit = true;
      if (this.isUrl) {
        if(this.trackId){
        if(this.amountPaidByUser.replace('Rs','').trim()){
          this.formSubmit = false;
          this.savePaymentInfo();
        }else{
          this.toastr.error("Please fill Amount paid by you !");
        } 
      }else{
        this.toastr.error("Please fill Transaction ID !");
      }
      }else{
      this.toastr.error("Please upload Screenshot !");
    }
  }
}
  savePaymentInfo() {
    var sendData = [];
    for (let i = 0; i < this.ids.length; i++) {
      const element = this.ids[i];
      var createObj = {
        transaction_id: this.trackId,
        payment_type: this.modeTransaction,
        amount: this.amountPaidByUser.replace('Rs','').trim(),
        participantId: element,
        status: "Payment verification pending",
        payment_status: "Done",
      };
      sendData.push(createObj);
    }

    this.mainLoaderIs = true;
    this.http.addPaymentInfo(sendData).subscribe((response: any) => {
      if (response) {
        this.mainLoaderIs = false;
        console.log(response);
        this.participantPayId = response.map((ele) => {
          return ele.id;
        });
        console.log(this.participantPayId);
        if(this.isUrl){
          this.saveImgInfo();
        }

        this.showPaymentInfo = false;
        this.showSuccess = true;
        this.toastr.success("Data recorded successfully!");
      } else {
        this.toastr.error("Something went wrong!");
        this.showPaymentInfo = true;
      }
    });
  }
}
