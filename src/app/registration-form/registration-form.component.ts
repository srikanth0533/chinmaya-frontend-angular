import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { HttpService } from "../service/http.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl,
} from "@angular/platform-browser";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { uid, suid } from "rand-token";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.css"],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `.modal-dialog{
      max-width: 312px;
    width: 100%;
    
    margin: 200px auto;
    }
      .dark-modal .modal-content {
        background-color: #292b2c;
        color: white;
      }
      .dark-modal .close {
        color: white;
      }
      .light-blue-backdrop {
        background-color: #5cb3fd;
      }
    `,
  ],
})
export class RegistrationFormComponent implements OnInit {

  modalReference: NgbModalRef;
  showPreview: boolean = false;
  showNextQuestion: boolean = false;
  mainLoaderIs: boolean = false;
  schoolList: any = [];
  orderID: any;
  amount: any;
  validEmail: boolean;
  validMobile2: boolean;
  validMobile1: boolean;
  formSubmit: boolean;
  participantMobileNo2: any;
  participantMobileNo1: any;
  participantFName: any;
  participantMName: any;
  participantLName: any;
  participantEmailId: any;
  participantStd: any;
  participantSchoolName: any = '';
  participantReason: any;
  activeBtn: any = "";
  participantSchoolId: any;
  participantSchlname: any;
  showPayment: boolean = false;
  showEndPage: boolean = false;
  showFormName: boolean = false;
  regForm: boolean = false;
  introPage: boolean = true;
  instructions: boolean = false;
  msg: any;
  url: any;
  isUrl: boolean = false;
  formDataCovertedInObject: any;
  showFormEmailId: boolean = false;
  showFormContact: boolean = false;
  showFormSchool: boolean = false;
  showFormExParticipant: boolean = false;
  changeInput: boolean = false;
  // createdId: any;
  trackId: any;
  participantToken: any;
  multiParticipant: any = [];
  finalMultiparticipantList: any = [];
  addMoreBtn: boolean = false;
  ids: any = [];
  participantEmailIdRecheck: any;
  validEmailRecheck: boolean;
  participantPayId: any;
  showPaymentInfo: boolean = false;
  amountPaidByUser: any = "Rs  ";
  showSuccess: boolean = false;
  modeTransaction: any;
  editFormData: boolean = false;
  sumAmount: any;
  isChecked: boolean = false;
  adultList: any;
  otherSchool: any;
  selectedSchoolId: any;
  isOtherSchoolPrvided: boolean = false;
  participantSelectedchlname: any;
  participantAdultName: any;
  participantAdultSchoolId: any;
  participantAdultSchlname: any;
  finalSchoolIdSelected: any;
  schoolNameList: any = [];
  getSchoolIdFromObj: any;
  maintenanceModeValue:boolean;
  registrationExpiryStatus:any;
  constructor(
    private router: Router,
    public http: HttpService,
    private toastr: ToastrService,
    protected sanitizer: DomSanitizer, private modalService: NgbModal
  ) { }

  // @ViewChild('myinput') input;

  ngOnInit() {
    this.maintenanceStatus();
    this.getExpiryDate();
    setInterval(() => {
      this.maintenanceStatus();
      this.getExpiryDate();
    }, 10000);
    this.getSchoolNameList();
  }

  //on selection of school name from school list save school selected data
  // onChangeSchoolName() {
  //   if (this.participantSchoolName) {
  //     console.log(this.participantSchoolName);
  //     this.participantSchoolId = this.participantSchoolName.id;
  //     this.participantSchlname = this.participantSchoolName.schoolName;
  //     this.amount = this.participantSchoolName.reg_fees;
  //     // this.getSchoolNameList();
  //   }
  // }
  // onChangeAdultName() {
  //   console.log(this.participantAdultName);
  //   if (this.participantAdultName) {
  //     this.participantAdultSchoolId = this.participantAdultName.id;
  //     this.participantAdultSchlname = this.participantAdultName.schoolName;
  //     this.amount = this.participantAdultName.reg_fees;
  //     // this.getSchoolNameList();
  //   }
  // }

  //get school list from api
  getSchoolNameList() {
    this.mainLoaderIs = true;
    this.http.getSchoolList().subscribe((response: any) => {
      

      if (response) {
        console.log(response);
        this.schoolList = response.studentsPartcipantsArray;
        this.adultList = response.adultPartcipantsArray;
        // console.log(this.schoolNameList);
      } else {
        this.toastr.error("Something went wrong!");
      }
      this.mainLoaderIs = false;
    });
  }

  //regex validation declared and defined for email and phone no
  validationCheck() {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.validEmail = emailRegex.test(this.participantEmailId);
    this.validEmailRecheck = emailRegex.test(this.participantEmailIdRecheck);
    var mobRegex = /^((?!(0))[0-9]{10})$/;
    this.validMobile1 = mobRegex.test(this.participantMobileNo1);
    this.validMobile2 = mobRegex.test(this.participantMobileNo2);
  }

  //to check if participant selected yes or no in feedback question
  clickYesParticipated() {
    this.showNextQuestion = false;
    this.activeBtn = "yes";
  }
  clickNoParticipated() {
    this.showNextQuestion = true;
    this.activeBtn = "no";
  }

  selectSchool() {
    this.isOtherSchoolPrvided = false;
    this.participantSelectedchlname = "";
    this.finalSchoolIdSelected = "";
    this.participantAdultName = "";
  }
  provideSchool() {
    this.isOtherSchoolPrvided = true;
    this.participantSchoolName = "";
    this.getSchoolIdFromObj = "";
    this.participantAdultName = "";
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  goToFormArea() {
    setTimeout(() => {
      var focusName = document.getElementById("participantFName") as HTMLInputElement;
      focusName.focus();
    }, 100);
    this.regForm = true;
    this.showFormName = true;
    this.instructions = false;
  }

  changeStd(){
    if(this.participantStd == 'Std 11 & Above'){
      this.participantSchoolName = "";
      this.otherSchool = "";
    }else{
      this.participantAdultName = "";
    }
  }

  //on each page of form check validity of data and mandatory data
 async checkFormDataValidation() {
    this.topFunction();
    if (this.showFormName) {
      // this.myInputField.nativeElement.focus();


      this.formSubmit = true;
      if (this.participantFName && this.participantLName) {
        this.showFormName = false;
        this.showFormEmailId = true;
        this.formSubmit = false;
        setTimeout(() => {
          var focusEmail = document.getElementById("participantEmailId") as HTMLInputElement;
          focusEmail.focus();
        }, 100);
      } else {
        this.showFormName = true;
      }
    } else if (this.showFormEmailId) {

      this.formSubmit = true;
      if (
        this.participantEmailId &&
        this.validEmail &&
        this.participantEmailIdRecheck &&
        this.validEmailRecheck
      ) {
        if (this.participantEmailId == this.participantEmailIdRecheck) {
          this.formSubmit = false;
          this.showFormContact = true;
          this.showFormEmailId = false;
          setTimeout(() => {
            var focusContact = document.getElementById("participantMobileNo1") as HTMLInputElement;
            focusContact.focus();
          }, 100);
        } else {
          this.showFormEmailId = true;
        }
      } else {
        this.showFormEmailId = true;
      }
    } else if (this.showFormContact) {

      this.formSubmit = true;
      if (this.validMobile1 && this.participantMobileNo1) {
        this.formSubmit = false;
        if (this.participantMobileNo2) {
          this.formSubmit = true;
          if (this.validMobile2 && this.participantMobileNo2 != this.participantMobileNo1) {
            this.formSubmit = false;
            this.showFormContact = false;
            this.showFormSchool = true;
            setTimeout(() => {
              var focusStd = document.getElementById("participantStd") as HTMLInputElement;
              focusStd.focus();
            }, 100);
          } else {
            this.showFormContact = true;
          }
        } else {
          this.showFormContact = false;
          this.showFormSchool = true;
          setTimeout(() => {
            var focusStd = document.getElementById("participantStd") as HTMLInputElement;
            focusStd.focus();
          }, 100);
        }
      } else {
        this.showFormContact = true;
      }
    } else if (this.showFormSchool) {
      this.formSubmit = true;
      if (this.participantStd) {
        if (this.participantStd == 'Std 11 & Above') {
         
          if (this.participantAdultName) {
            console.log('adult called');
            this.formSubmit = false;
            this.showFormSchool = false;
            this.showFormExParticipant = true;

            var getAdultchoolObj = this.adultList.find((school) => {
              return school.schoolName === this.participantAdultName
            })
            this.amount = getAdultchoolObj.reg_fees;
            this.participantAdultSchoolId = getAdultchoolObj.id;
            console.log(this.participantAdultSchoolId, this.participantAdultName, this.amount, 'adult obj removal');


            this.participantSelectedchlname = this.participantAdultName;
            this.finalSchoolIdSelected = this.participantAdultSchoolId;
            console.log(this.participantSelectedchlname, this.finalSchoolIdSelected, 'adult');

          } else {
            this.showFormSchool = true;
          }
        } else {
          
          if (this.participantSchoolName == 'Others') {
            if (this.otherSchool) {
              this.isOtherSchoolPrvided = true;
              console.log('other called');
             await this.getOtherSchoolData();
              this.formSubmit = false;
              this.showFormSchool = false;
              this.showFormExParticipant = true;
              // console.log(this.amount, this.selectedSchoolId, 'other school after api log');
            }else{
              this.formSubmit = true;
            }
          }else{
            if(this.participantSchoolName){
              console.log('schoolist called');
              this.isOtherSchoolPrvided = false;
              this.formSubmit = false;
              this.showFormSchool = false;
              this.showFormExParticipant = true;
  
              var getSchoolObj = this.schoolList.find((school) => {
                return school.schoolName === this.participantSchoolName
              })
              this.amount = getSchoolObj.reg_fees;
              this.getSchoolIdFromObj = getSchoolObj.id;
              console.log(this.getSchoolIdFromObj, this.participantSchoolName, this.amount, 'schoollist obj removal');
  
              this.participantSelectedchlname = this.participantSchoolName;
              this.finalSchoolIdSelected = this.getSchoolIdFromObj;
              console.log(this.participantSelectedchlname, this.finalSchoolIdSelected, 'school name');
            }else{
              this.formSubmit = true;
            }
            
          }
        }

      } else {
        this.showFormSchool = true;
      }

      
    } else if (this.showFormExParticipant) {
      this.formSubmit = true;
      if (this.activeBtn == 'no') {
        if (this.participantReason) {
          this.formSubmit = false;
          this.showFormExParticipant = false;
          this.showPreview = true;
          this.regForm = false;
        } else {
          this.showFormExParticipant = true;
        }
      } else if (this.activeBtn == 'yes') {
        this.formSubmit = false;
        this.showFormExParticipant = false;
        this.showPreview = true;
        this.regForm = false;
      }

    }
    if (this.showPreview) {
      console.log(this.participantSelectedchlname, this.finalSchoolIdSelected, '-----------------got final school name--------------------');
      var sendData = {
        firstName: this.participantFName ? this.participantFName : null,
        middleName: this.participantMName ? this.participantMName : null,
        lastName: this.participantLName ? this.participantLName : null,
        std: this.participantStd ? this.participantStd : null,
        schoolId: this.finalSchoolIdSelected ? this.finalSchoolIdSelected : null,
        primaryContactNo: this.participantMobileNo1 ? this.participantMobileNo1 : null,
        secondaryContactNo: this.participantMobileNo2 ? this.participantMobileNo2 : null,
        emailId: this.participantEmailId ? this.participantEmailId : null,
        question1: this.showPreview ? this.showNextQuestion == false ? "yes" : "no" : null,
        question2: this.participantReason,
        // status: "Form Submitted",
        payment_status: "Pending",
        participantToken: "",
        schoolName: this.participantSchoolName == 'Others' ? "Others" : "",
        schoolNameSelected: this.participantSelectedchlname,
        amountFromSchool: this.amount,
        amount: this.amountPaidByUser,
        type: this.participantStd == "Std 11 & Above" ? "adult" : "student",
        reg_fees: "100",
      };
      console.log(sendData, 'hihihihihii');
      // console.log("edit outside", this.editFormData);

      if (this.editFormData) {
        console.log("edit inside");
        console.log(this.multiParticipant, 'hihihihihii Multiparticipant array');
        for (let i = 0; i < this.multiParticipant.length; i++) {
          const element = this.multiParticipant[i];
          console.log(element.participantToken,"old",this.participantToken,"token");
          if (element.participantToken == this.participantToken) {
            this.multiParticipant[i].firstName = sendData.firstName;
            this.multiParticipant[i].middleName = sendData.middleName;
            this.multiParticipant[i].lastName = sendData.lastName;
            this.multiParticipant[i].std = sendData.std;
            this.multiParticipant[i].schoolId = sendData.schoolId;
            this.multiParticipant[i].primaryContactNo = sendData.primaryContactNo;
            this.multiParticipant[i].secondaryContactNo = sendData.secondaryContactNo;
            this.multiParticipant[i].emailId = sendData.emailId;
            this.multiParticipant[i].question1 = sendData.question1;
            this.multiParticipant[i].question2 = sendData.question2;
            // this.multiParticipant[i].status = sendData.status;
            this.multiParticipant[i].payment_status = sendData.payment_status;
            this.multiParticipant[i].participantToken = this.participantToken;
            this.multiParticipant[i].schoolName = sendData.schoolName;
            this.multiParticipant[i].schoolNameSelected = sendData.schoolNameSelected;
            this.multiParticipant[i].type = sendData.type;
          }
        }
      } else {
        this.generateToken();

        sendData.participantToken = this.participantToken;

        if (this.multiParticipant.length > 0) {
          var mapUSers = this.multiParticipant.filter((user) => {
            return (
              user.firstName == sendData.firstName &&
              user.lastName == sendData.lastName
            );
          });
          // console.log(mapUSers, "--------------------------");

          if (mapUSers.length == 0) {
            this.multiParticipant.push(sendData);
          }
        } else {
          this.multiParticipant.push(sendData);
        }
      }

      sessionStorage.setItem(
        "storedMultiParticipant",
        JSON.stringify(this.multiParticipant)
      );
      this.editFormData = false;
      // console.log(this.finalMultiparticipantList);

      this.finalMultiparticipantList = [
        ...JSON.parse(sessionStorage.getItem("storedMultiParticipant")),
      ];
      this.sumAmount = 0;
      this.finalMultiparticipantList.forEach((element) => {
        this.sumAmount += parseInt(element.amountFromSchool);
      });


    }
  }
  async getOtherSchoolData() {
    var sendOtherData = {
      schoolName: this.otherSchool,
      reg_fees: 100,
      type: this.participantStd == "Std 11 & Above" ? "adult" : "others",
    };

    var response: any = await this.http.getSchoolId(sendOtherData).toPromise();

    if (response) {
      console.log(response);
      this.amount = response.reg_fees;
      this.selectedSchoolId = response.id;

      this.participantSelectedchlname = response.schoolName;
      this.finalSchoolIdSelected = this.selectedSchoolId;
      console.log(this.participantSelectedchlname, this.finalSchoolIdSelected, 'other school');

    } else {
      this.toastr.error("Something went wrong!");
    }

  }
  //generation of token
  generateToken() {
    this.participantToken = uid(8);
    console.log(this.participantToken);
  }

  //save form data and checks for which payment service to use on api response
  saveFormData() {
    var sendData: any = this.finalMultiparticipantList;
    this.mainLoaderIs = true;
    this.http.getRegId(sendData).subscribe((response: any) => {
      this.mainLoaderIs = false;
      if (response) {
        console.log(response);
        // this.createdId = response.id;
        if (response.paymentMethod == "instamojo") {
          if(response.paymentUrl){
            window.open(response.paymentUrl, "_self");
            this.toastr.success("Form submitted successfully!");
          }else{
            this.router.navigate(["participantStatus"]);
          }
          
        } else if (response.paymentMethod == "manual") {
          this.ids = response.data.map((ele) => {
            return ele.id;
          });
          console.log(this.ids);
          this.showPreview = false;
          this.toastr.success("Data recorded successfully!");
          // this.router.navigateByUrl('/paymentPage');
          this.router.navigate(["paymentPage"]);
          // this.showPayment = true;
        }
        if(response.message){
          this.toastr.error(response.message);
        }
        this.addMoreBtn = false;
       
      } else {
        this.showPreview = true;
        this.toastr.error("Something went wrong!");
      }
    });
  }



  openMd(addMore) {
    this.modalReference = this.modalService.open(addMore, { size: "sm" });
  }


  //if add more button is pressed
  addMoreParticipant() {
    this.addMoreBtn = true;
    this.modalReference.close();
    this.regForm = true;
    this.showFormName = true;
    this.showPreview = false;
    this.participantFName = "";
    this.participantMName = "";
    this.participantLName = "";
    this.participantStd = "";
    this.participantSchoolName = "";
    this.participantAdultName = "";
    this.otherSchool = "";
    this.participantMobileNo1 = "";
    this.participantMobileNo2 = "";
    this.participantEmailId = "";
    this.participantEmailIdRecheck = "";
    this.participantReason = "";
    this.showNextQuestion = null;
    this.activeBtn = "";
    this.isOtherSchoolPrvided = false;
  }

  backBtnPage() {
    if (this.showFormName) {
      this.instructions = true;
      this.showFormName = false;
      this.regForm = false;
    }
    if (this.showFormEmailId) {
      this.showFormName = true;
      this.showFormEmailId = false;
    }
    if (this.showFormContact) {
      this.showFormEmailId = true;
      this.showFormContact = false;
    }
    if (this.showFormSchool) {
      this.showFormContact = true;
      this.showFormSchool = false;
    }
    if (this.showFormExParticipant) {
      this.showFormSchool = true;
      this.showFormExParticipant = false;
    }
  }

  //if edit button is pressed
  editForm(single) {
    console.log(single, "-------------------");
    if (single.std == 'Std 11 & Above') {
      var adultListEdit = single.schoolNameSelected;
    } else{
      if (single.schoolName == "Others") {
        var otherSchoolEdit = single.schoolNameSelected;
      } else {
        var schoolListEdit = single.schoolNameSelected;
      }
    }
    console.log(adultListEdit, otherSchoolEdit, schoolListEdit, "edit values of school");
    this.editFormData = true;
    this.showPreview = false;
    this.showFormName = true;
    this.regForm = true;
    this.participantFName = single.firstName ? single.firstName : "";
    this.participantMName = single.middleName ? single.middleName : "";
    this.participantLName = single.lastName ? single.lastName : "";
    this.participantStd = single.std ? single.std : "";
    if(single.schoolName == "Others"){
      this.participantSchoolName = single.schoolName ? single.schoolName : "";
    }else{
      this.participantSchoolName = schoolListEdit ? schoolListEdit : "";
    }
    
    this.participantAdultName = adultListEdit ? adultListEdit : "";
    // this.participantAdultName= this.adultList.find((school) => school.schoolName === single.schoolName) ? this.adultList.find((school) => school.schoolName === single.schoolName) : ""
    this.otherSchool = otherSchoolEdit ? otherSchoolEdit : "";
    this.participantMobileNo1 = single.primaryContactNo ? single.primaryContactNo : "";
    this.participantMobileNo2 = single.secondaryContactNo ? single.secondaryContactNo : "";
    this.participantEmailId = single.emailId ? single.emailId : "";
    this.participantEmailIdRecheck = single.emailId ? single.emailId : "";
    this.showNextQuestion = single.question1 == "yes" ? false : true;
    this.participantToken = single.participantToken;
  }
  removeImage(){
    this.isUrl = false;
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
  maintenanceStatus() {
    // this.mainLoaderIs = true;
    this.http.getMaintenanceStatus().subscribe((response: any) => {
        if (response) {
          this.maintenanceModeValue = response[0].maintenance;
          if(this.maintenanceModeValue){
            this.router.navigate(["maintenanceMode"]);
          }
          console.log(response[0].maintenance);
        } else {
          this.toastr.error("Something went wrong!");
        }
        // this.mainLoaderIs = false;
      });
  }
  getExpiryDate(){
    this.http.getAllExpiryDate().subscribe((response: any) => {
      if(response){
        console.log(response);
        this.registrationExpiryStatus = response[1].expiry
        if(this.registrationExpiryStatus){
          this.router.navigate(["registrationClose"]);

        }
       
      }else {
        this.toastr.error("Something went wrong!");
      }
    })
  }
 

  

  // getOrderId() {
  //   var sendData = [
  //     {
  //       firstName: this.participantFName,
  //       middleName: this.participantMName,
  //       lastName: this.participantLName,
  //       std: this.participantStd,
  //       schoolId: this.participantSchoolName.id,
  //       primaryContactNo: this.participantMobileNo1,
  //       secondaryContactNo: this.participantMobileNo2,
  //       emailId: this.participantEmailId,
  //       question1: this.showNextQuestion == false ? "yes" : "no",
  //       question2: this.showNextQuestion == true ? this.participantReason : "",
  //       status: "Form not submitted",
  //       payment_type: "UPI"
  //     },
  //   ];
  //   this.mainLoaderIs = true;
  //   this.http.getOrder(sendData).subscribe((response: any) => {
  //     this.mainLoaderIs = false;
  //     if (response) {
  //       console.log(response);
  //       this.showPreview = false;
  //       this.showPayment = true;
  //       this.toastr.success("Data recorded successfully!");
  //     } else {
  //       this.toastr.error("Something went wrong!");
  //       this.showPreview = true;
  //     }
  //   });

  // }

  // updateFormData(){
  //   var sendData =
  //    [
  //     {
  //       id:this.createdId,
  //       firstName: this.participantFName ? this.participantFName : null,
  //       middleName: this.participantMName ? this.participantMName : null,
  //       lastName: this.participantLName ? this.participantLName : null,
  //       std: this.participantStd ? this.participantStd : null,
  //       schoolId: this.participantSchoolName.id ? this.participantSchoolName.id : null,
  //       primaryContactNo: this.participantMobileNo1 ? this.participantMobileNo1 : null,
  //       secondaryContactNo: this.participantMobileNo2 ? this.participantMobileNo2 : null,
  //       emailId: this.participantEmailId ? this.participantEmailId : null,
  //       question1: this.showFormExParticipant? (this.showNextQuestion == false ? "yes" : "no") : null,
  //       question2: this.showNextQuestion == true ? this.participantReason : null,
  //       status:"Form not submitted",
  //       payment_type:"UPI"
  //     }
  //   ];
  //   this.mainLoaderIs = true;
  //   this.http.sendUpdatedForm(sendData).subscribe((response: any) => {
  //     this.mainLoaderIs = false;
  //     if (response) {
  //       console.log(response);
  //       if(this.showFormEmailId){
  //         this.showFormContact = true;
  //         this.showFormEmailId = false;
  //       }else if(this.showFormContact){
  //         this.showFormContact = false;
  //         this.showFormSchool = true;
  //       }else if(this.showFormSchool){
  //         this.showFormSchool = false;
  //         this.showFormExParticipant = true;
  //       }else if(this.showFormExParticipant){
  //         this.showFormExParticipant = false;
  //         this.showPreview = true;
  //       }

  //       this.toastr.success("Data recorded successfully!");
  //     } else {
  //       this.toastr.error("Something went wrong!");
  //     }
  //   });
  // }
}
