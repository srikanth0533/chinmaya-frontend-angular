import { Component, OnInit, Renderer2, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../service/http.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-mobile-verification",
  templateUrl: "./mobile-verification.component.html",
  styleUrls: ["./mobile-verification.component.css"],
  encapsulation: ViewEncapsulation.None, 
})
export class MobileVerificationComponent implements OnInit {
  showReconfirmation = true;
  isAppeal=true;
  isVerificationPage = false;
  mainLoaderIs: boolean;
  refCode: any;
  mobileNo: any;
  singleNo: any;
  isSubmit: boolean = false;
  isEdited: boolean = false;
  mobileNumberObj: any = {
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
    seven: "",
    eight: "",
    nine: "",
    ten: "",
  };
  editName: any = "";
  isEditName: boolean = false;
  showexpiry: boolean = false;
  msg: any;
  singleNumber: any;
  singleNumber2: any;
  validMobile: boolean;
  participantName: any = "";

  constructor(
    public renderer: Renderer2,
    private toastr: ToastrService,
    public http: HttpService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.getMobileDataToken();
    }, 100);
  }
  validationCheck() {
    var mobRegex = /^((?!(0))[0-9]{10})$/;
    this.validMobile = mobRegex.test(this.mobileNo);
  }
  moveFocusInput(event, nextElement, previousElement) {
    /* console.log("event", event.keyCode);
    console.log("nextElement", nextElement);
    console.log("previousElement", previousElement); */

    if (event.target.value.length < 1 && previousElement) {
      var prevElement = this.renderer.selectRootElement(previousElement);
      prevElement.focus();
    } else if (nextElement && event.target.value.length > 0) {
      var nxtElement = this.renderer.selectRootElement(nextElement);
      nxtElement.focus();
    } else {
      return 0;
    }

    /* if (event.keyCode == 8 && previousElement) {
      var prevElement = this.renderer.selectRootElement(previousElement);
      prevElement.focus();
    } else if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
      if (nextElement) {
        var nxtElement = this.renderer.selectRootElement(nextElement);
        nxtElement.focus();
      }
    } else {
      event.path[0].value = '';
    } */
  }
  gotoVerification(){
    this.isAppeal = false;
    this.isVerificationPage =true;
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getMobileDataToken() {
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
          this.mobileNo = response.mobileNo;
          this.participantName = response.firstName + ' ' + response.lastName;
          this.editName = response.participantName;
        } else {
          this.toastr.warning("Something went wrong!");
          this.showexpiry = true;
          console.log(this.showexpiry);
          this.msg = response.msg;
        }

        this.mainLoaderIs = false;
      });
    }
  }

  editMobileNo() {
   
    this.mobileNo =  "";
    this.isEdited = true;
setTimeout(() => {
    var focusMobileNo = document.getElementById("mobileNo") as HTMLInputElement;
    focusMobileNo.focus();
  }, 100);
  }
  verify() {
    this.isEditName = true;
    this.showReconfirmation = false;
  }

  confirmMobile() {
    this.mainLoaderIs = true;
    if(this.mobileNo != ""){
    var sendData = {
      mobileNo:this.mobileNo,
      isEdited: this.isEdited,
      token: this.refCode,
      // name: this.editName,
      // isNameEdited: this.isEditName,
      // prevName:this.participantName
    };
    if (this.validMobile == false) {
      this.mainLoaderIs = false;
      this.showReconfirmation = true;
      this.toastr.warning("Please enter valid mobile number!");
    } else {
      
      this.http.getEditData(sendData).subscribe((response) => {
        if (response.success == true) {
          this.showReconfirmation = false;
          console.log(this.showexpiry);
          this.toastr.success("Updated successfully!");
          this.singleNumber = response.mobileNo;
          this.getMobileDataToken();
        } else {
          this.toastr.warning("Something went wrong!");
          this.showexpiry = true;
          console.log(this.showexpiry);
          this.msg = response.msg;
        }
      });
      this.mainLoaderIs = false;
    }
  }else{
    this.mainLoaderIs = false;
    this.showReconfirmation = true;
      this.toastr.warning("Mobile number field is required!");
  }
  }
}
