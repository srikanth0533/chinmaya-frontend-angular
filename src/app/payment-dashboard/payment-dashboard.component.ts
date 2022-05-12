import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../service/http.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject, merge } from "rxjs";
import { environment } from '../../environments/environment';
import { uid, suid } from "rand-token";
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from "rxjs/operators";

@Component({
  selector: 'app-payment-dashboard',
  templateUrl: './payment-dashboard.component.html',
  styleUrls: ['./payment-dashboard.component.css','../certificate.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
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
export class PaymentDashboardComponent implements OnInit {
  @ViewChild("instance1", { static: true }) 
  instance1: NgbTypeahead;
  focus$1 = new Subject<string>();
  click$1 = new Subject<string>();
  instance2: NgbTypeahead;
  focus$2 = new Subject<string>();
  click$2 = new Subject<string>();
  tempStoreNameList: any;
  // modalReference: any;
  showNextQuestion: boolean = false;
  mainLoaderIs: boolean = false;
  schoolList: any;
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
  participantSchoolName: any;
  participantReason: any;
  activeBtn: any = "";
  participatedList: any = [];
  schoolName: any;
  participantStatus: any;
  participantPaymentID: any;
  participantPaymentType: any;
  participantSchoolId: any;
  participantSchlname: any;
  amount: any;
  imgRootUrl: any = environment.rootURL + '/images/';
  paymentStatus: any;
  participantUpdateId: any;
  paymentUpdateId: any;
  updateParticipantShow: boolean = false;
  addParticipantShow: boolean = false;
  imgParticipantUrl: any;
  sendPayLinkName: any;
  sendPayLinkEmailid: any;
  sendPayLinkid: any;
  sendPayLinkToken: any;
  sendPayLinkFees: any;
  sendPayLinkLastName: any;
  participantDataStored: any = [];
  sendEmailName: any;
  sendEmailLastName: any;
  sendEmailEmailid: any;
  sendEmailid: any;
  sendEmailToken: any;
  sendEmailFees: any;
  adultList: any;
  otherSchool: any;
  selectedSchoolId: any;
  isOtherSchoolPrvided: boolean = false;
  participantSelectedchlname: any;
  participantAdultName: any;
  participantAdultSchoolId: any;
  participantAdultSchlname: any;
  finalSchoolIdSelected: any;
  // schoolSelected: boolean;
  getSchoolIdFromObj: any;
  participantToken: any;
  paymentMethod: any;
  paymentReqId: any;
  paymentStatusInstamojoAmount: any;
  paymentStatusInstamojoEmail: any;
  paymentStatusInstamojoCardType: any;
  paymentStatusInstamojoFailure: any;
  paymentStatusInstamojoStatus: any;
  paymentStatusInstamojoTime: any;
  paymentStatusInstamojoPaymentID: any;
  paymentId: any;
  failureMessage: any;
  failureReason: any;
  paymentResponse: boolean = false;
  participantDeleteId: any;
  offset: any = 0;
  page = 1;
  pageSize: any = 10;
  totalCount: any;
  storeNameList: any;
  participantFullName: any = "";
  filterStatus: any = "";
  paidAmountVal: any = "";
  filtePaymentStatus: any = "";
  filterPaymentId: any = "";
  paymentResponsePending: any = "";
  responseFalse: boolean = false;
  createdParticipantId: any;
  maintenanceMode: boolean;
  loggedUserObject: any;
  showMaintenanceToggle: boolean = false;
  filterSTD: any = "";
  filterSchoolName: any;
  schoolNameList: any;
  participantRank: any;
  certificateName: any;
  isRankUpdate: boolean = false;
  isUpdateAttendance: boolean = false;
  updateAttendance: any;
  isSelectCertificateType: any;
  sendSingleCertificate : any;  
  modalRefpassreset:any;
  pToken:any
  partToken:any
  modalReferenceAdd: NgbModalRef;
  modalReferenceUpdate: NgbModalRef;
  modalReferenceDelete: NgbModalRef;
  modalReferenceOpenPaymentLinkConf: NgbModalRef;
  modalReferenceOpenConfEmail: NgbModalRef;
  modalReferenceOpenImg: NgbModalRef;
  modalReferenceOpencertificate: NgbModalRef;
  modalReferenceOpenWinnercertificate: NgbModalRef;
  modalReferenceOpenReconfirmEmail: NgbModalRef;
  sendButoon:boolean = true;
  pIdArr:any = []
  checked:boolean = false
  mailSlottingid:any
  pId:any
  certificateStd:any
  emailButtons:boolean = false;
  sendParticipantToken: any;
  constructor(private toastr: ToastrService,
    public http: HttpService,
    private modalService: NgbModal,
    config: NgbTooltipConfig,) {
    config.placement = 'left';
    
    
  }  

  ngOnInit() {
    this.loggedUserObject = JSON.parse(sessionStorage.getItem('userData'));
    if(this.loggedUserObject.user.roleId == 1){
      this.showMaintenanceToggle = true;
    }else{
      this.showMaintenanceToggle = false;
    }
    this.maintenanceMode = JSON.parse(sessionStorage.getItem("sessionMaintenance"));
    this.getParticipantRegData();
    this.getSchoolNameList();
    this.get_parti_name_list();
  }
  
  modelBoxStatus(modelbox: any) {
    this.modalRefpassreset = this.modalService.open(modelbox, { ariaLabelledBy: 'modal-basic-title' });
   
  }

  emailButtonsClick(){
    this.emailButtons = true
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


  onChangeSchoolName() {
    if (this.participantSchoolName) {
      this.participantSchoolId = this.participantSchoolName.id;
      this.participantSchlname = this.participantSchoolName.schoolName;
      this.amount = this.participantSchoolName.reg_fees;
    }
  }

  //get school list from api
  getSchoolNameList() {
    this.mainLoaderIs = true;
    this.http.getSchoolList().subscribe((response: any) => {
      this.mainLoaderIs = false;

      if (response) {
        this.schoolList = response.studentsPartcipantsArray;
        this.adultList = response.adultPartcipantsArray;
        this.schoolNameList = this.schoolList.map((list => list.schoolName));
      } else {
        this.toastr.error("Something went wrong!");
      }
    });
  }

  openLg(longContent, type, dataList, rank) {
    // this.validationCheck();
    if (type == 'edit') {
      this.validMobile1 = true;
      this.validEmail = true;
      this.validMobile2 = true;
      this.addParticipantShow = false;
      this.updateParticipantShow = true;

      if (dataList.participant.std == 'Std 11 & Above') {
        var adultListEdit = dataList.participant.school.schoolName;
      } else {
        if (dataList.participant.school.schoolName == "Others") {
          var otherSchoolEdit = dataList.participant.school.schoolName;
        } else {
          var schoolListEdit = dataList.participant.school.schoolName;
        }
      }

      this.participantUpdateId = dataList.participant.id;
      this.paymentUpdateId = dataList.id;
      this.participantFName = dataList.participant.firstName ? dataList.participant.firstName : "";
      this.participantLName = dataList.participant.lastName ? dataList.participant.lastName : "";
      this.participantEmailId = dataList.participant.emailId ? dataList.participant.emailId : "";
      // this.participantSchoolName = dataList.participant.school.schoolName ? dataList.participant.school.schoolName : "";
      // this.otherSchool = dataList.participant.school.schoolName ? dataList.participant.school.schoolName : "";
      // this.participantAdultName= adultSchoolName ? adultSchoolName : "";
      this.participantMobileNo1 = dataList.participant.primaryContactNo ? dataList.participant.primaryContactNo : "";
      this.participantMobileNo2 = dataList.participant.secondaryContactNo ? dataList.participant.secondaryContactNo : "";
      this.participantStd = dataList.participant.std ? dataList.participant.std : "";
      this.activeBtn = dataList.participant.question1 ? dataList.participant.question1 : '';
      this.participantReason = dataList.participant.question2 ? dataList.participant.question2 : "";
      this.paymentStatus = dataList.payment_status ? dataList.payment_status : "";
      this.participantStatus = dataList.participant.status ? dataList.participant.status : "";
      // this.participantPaymentID = dataList.transaction_id ? dataList.transaction_id : "";
      this.participantPaymentID = dataList.payment_id ? dataList.payment_id : "";
      this.participantPaymentType = dataList.payment_type ? dataList.payment_type : "";
      this.participantRank = dataList.participant.rank ? dataList.participant.rank : "";
      this.updateAttendance = dataList.participant.attendance ? dataList.participant.attendance : "";
      if (dataList.participant.school.schoolName == "Others") {
        this.participantSchoolName = dataList.participant.school.schoolName ? dataList.participant.school.schoolName : "";
      } else {
        this.participantSchoolName = schoolListEdit ? schoolListEdit : "";
      }

      this.participantAdultName = adultListEdit ? adultListEdit : "";
      this.otherSchool = otherSchoolEdit ? otherSchoolEdit : "";

    } else if (type == 'add') {
      this.addParticipantShow = true;
      this.updateParticipantShow = false;
      this.participantUpdateId = "";
      this.paymentUpdateId = "";
      this.participantFName = "";
      this.participantLName = "";
      this.participantMName = "";
      this.participantEmailId = "";
      this.participantSchoolName = "";
      this.participantMobileNo1 = "";
      this.participantMobileNo2 = "";
      this.participantStd = "";
      this.activeBtn = "";
      this.participantReason = "";
      this.paymentStatus = "";
      this.participantStatus = "";
      this.participantPaymentID = "";
      this.participantPaymentType = "";
      this.participantAdultName = "";
      this.otherSchool = "";
      this.isOtherSchoolPrvided = false;
    
      // this.participantRank = ""

    }
    if(rank == 'rank'){            
      this.isRankUpdate = true;
      this.updateUserData();
    }else if(rank == 'attendance'){
      this.isUpdateAttendance = true;
      this.updateUserData();
    }else{
      this.modalReferenceAdd = this.modalService.open(longContent, { size: "lg" });            
    }

    // if(rank == 'attendance'){ 
            
    //   this.isUpdateAttendance = true
    //   this.updateUserData();
    // }else{
    //   this.modalReferenceUpdate = this.modalService.open(longContent, { size: "lg" });      
    // }   
    
  }

  openMd(content, participant) {
    this.participantDeleteId = participant.participant.id;
    this.modalReferenceDelete = this.modalService.open(content, { size: "sm" });
  }

  openPaymentLinkConf(paymentLink, singleUser) {
    this.sendPayLinkName = singleUser.participant.firstName;
    this.sendPayLinkLastName = singleUser.participant.lastName;
    this.sendPayLinkEmailid = singleUser.participant.emailId;
    this.sendPayLinkid = singleUser.participant.id;
    this.sendPayLinkToken = singleUser.participant.participantToken;
    this.sendPayLinkFees = singleUser.participant.school.reg_fees;

    this.modalReferenceOpenPaymentLinkConf = this.modalService.open(paymentLink, { size: "lg" });
  }

  openConfEmail(confEmail, singleUser) {
    this.sendEmailName = singleUser.participant.firstName;
    this.sendEmailLastName = singleUser.participant.lastName;
    this.sendEmailEmailid = singleUser.participant.emailId;
    this.sendEmailid = singleUser.participant.id;
    this.sendEmailToken = singleUser.participant.participantToken;
    this.sendEmailFees = singleUser.participant.school.reg_fees;

    this.modalReferenceOpenConfEmail = this.modalService.open(confEmail, { size: "lg" });
  }

  openImg(imgContent, participant) {
    this.imgParticipantUrl = this.imgRootUrl + participant.image_path
    this.modalReferenceOpenImg = this.modalService.open(imgContent, { size: "lg" });
  }

  opencertificate(certificate,participant:any) {
    this.modalReferenceOpencertificate = this.modalService.open(certificate, { size: "lg" });
    this.sendParticipantToken = participant.participantToken;
    console.log(this.modalReferenceOpencertificate);
    
    if(participant.middleName == null)  {
      participant.middleName = ''
    }
    this.certificateName = participant.firstName + ' ' + participant.middleName + ' '+ participant.lastName; 4
    this.certificateStd = participant.std
   
    this.sendSingleCertificate = participant.rank;
  }

  openWinnercertificate(certificatewinner,participant:any) {
    this.modalReferenceOpenWinnercertificate = this.modalService.open(certificatewinner, { size: "lg" });  
    if(participant.middleName == null)  {
      participant.middleName = ''
    }
    this.sendParticipantToken = participant.participantToken;
    this.certificateName = participant.firstName + ' ' + participant.middleName + ' '+ participant.lastName; 
    this.sendSingleCertificate = participant.rank; 
    this.certificateStd = participant.std;   
  }

  SelectParticipentButton(){
    // this.selectParticipant(this.pId);
      var sendData = {
        ids : this.pIdArr
      }
      this.http.reAllocateParticipant(sendData).subscribe((response: any) => {
        this.mainLoaderIs = false;
        if (response) {
          this.pIdArr = []
          
          this.checked = false
          this.toastr.success("Successfully Select for Re-slotting!");
        } else {
          this.toastr.error("Something went wrong!");
        }
      });
    }

  
  selectParticipant(id:any){
  
    // if(id){
    //   this.pId = id
    // }
    this.pIdArr.push(id)
  }

  sendTokenPaymentLink() {
    this.mainLoaderIs = true;
    var sendData = {
      "participantId": this.sendPayLinkid,
      "participantToken": this.sendPayLinkToken,
      "paymentVerificationStatus": false
    }
    this.http.sendPaymentLinkToUser(sendData).subscribe((response: any) => {
      this.mainLoaderIs = false;
      if (response) {     
        if(this.modalReferenceAdd &&
          this.modalReferenceUpdate &&
          this.modalReferenceDelete &&
          this.modalReferenceOpenPaymentLinkConf &&
          this.modalReferenceOpenConfEmail &&
          this.modalReferenceOpenImg &&
          this.modalReferenceOpencertificate &&
          this.modalReferenceOpenWinnercertificate &&
          this.modalReferenceOpenReconfirmEmail ){
            this.modalReferenceAdd.close();
            this.modalReferenceUpdate.close();
            this.modalReferenceDelete.close();
            this.modalReferenceOpenPaymentLinkConf.close();
            this.modalReferenceOpenConfEmail.close();
            this.modalReferenceOpenImg.close();
            this.modalReferenceOpencertificate.close();
            this.modalReferenceOpenWinnercertificate.close();
            this.modalReferenceOpenReconfirmEmail.close();
        }   
        this.modalReferenceOpenPaymentLinkConf.close();        
        this.toastr.success("Successfully email sent!");
      } else {
        this.toastr.error("Something went wrong!");
      }
    });
  }

  sendConfirmationEmail() {
    this.mainLoaderIs = true;
    var sendData = {
      "participantId": this.sendEmailid,
      "participantToken": this.sendEmailToken,
      "paymentVerificationStatus": true
    }
    this.http.sendPaymentLinkToUser(sendData).subscribe((response: any) => {
      this.mainLoaderIs = false;
      if (response) {
        this.modalReferenceAdd.close();
        this.modalReferenceUpdate.close();
        this.modalReferenceDelete.close();
        this.modalReferenceOpenPaymentLinkConf.close();
        this.modalReferenceOpenConfEmail.close();
        this.modalReferenceOpenImg.close();
        this.modalReferenceOpencertificate.close();
        this.modalReferenceOpenWinnercertificate.close();
        this.modalReferenceOpenReconfirmEmail.close();
        this.toastr.success("Successfully email sent!");
      } else {
        this.toastr.error("Something went wrong!");
      }
    });
  }

  async updateUserData() {  
    
    if (this.participantStd) {
      if (this.participantStd == 'Std 11 & Above') {
        if (this.participantAdultName) {
          this.formSubmit = false;
          var getAdultchoolObj = this.adultList.find((school) => {
            return school.schoolName === this.participantAdultName
          })
          this.amount = getAdultchoolObj.reg_fees;
          this.participantAdultSchoolId = getAdultchoolObj.id;        

          this.participantSelectedchlname = this.participantAdultName;
          this.finalSchoolIdSelected = this.participantAdultSchoolId;
        } else {
          this.formSubmit = true;
        }
      } else {

        if (this.participantSchoolName == 'Others') {
          if (this.otherSchool) {
            this.isOtherSchoolPrvided = true;
            await this.getOtherSchoolData();
            this.formSubmit = false;
          } else {
            this.formSubmit = true;
          }
        } else {
          if (this.participantSchoolName) {
            this.isOtherSchoolPrvided = false;
            this.formSubmit = false;
            
            var getSchoolObj = this.schoolList.find((school) => {
              return school.schoolName === this.participantSchoolName
            })
            
            this.amount = getSchoolObj.reg_fees;
            this.getSchoolIdFromObj = getSchoolObj.id;
            this.participantSelectedchlname = this.participantSchoolName;
            this.finalSchoolIdSelected = this.getSchoolIdFromObj;
          } else {
            this.formSubmit = true;
          }

        }
      }

    }

    this.mainLoaderIs = true;
    var sendData = {
      paymentId: this.paymentUpdateId,
      participantId: this.participantUpdateId,
      firstName: this.participantFName,
      lastName: this.participantLName,
      std: this.participantStd,
      schoolId: this.finalSchoolIdSelected,
      primaryContactNo: this.participantMobileNo1,
      secondaryContactNo: this.participantMobileNo2,
      emailId: this.participantEmailId,
      question1: this.activeBtn,
      question2: this.participantReason,
      status: this.participantStatus,
      payment_status: this.paymentStatus,
      transaction_id: this.participantPaymentID,
      payment_id: this.participantPaymentID,
      payment_type: this.participantPaymentType,
      schoolName: this.participantSelectedchlname,
      schoolNameSelected: this.participantSelectedchlname,
      rank: this.participantRank,    
      attendance: this.updateAttendance == '0'? 0:1,
    }
    this.http.sendUpdatedForm(sendData).subscribe((response: any) => {
      this.mainLoaderIs = false;
      if (response) {  
        this.modalReferenceUpdate.close();
        this.getParticipantRegData();
        this.modalReferenceAdd.close();
        this.modalReferenceDelete.close();
        this.modalReferenceOpenPaymentLinkConf.close();
        this.modalReferenceOpenConfEmail.close();
        this.modalReferenceOpenImg.close();
        this.modalReferenceOpencertificate.close();
        this.modalReferenceOpenWinnercertificate.close();
        this.modalReferenceOpenReconfirmEmail.close();  
        if(this.isRankUpdate == false && this.isUpdateAttendance == false){
          this.modalReferenceAdd.close();
          this.modalReferenceUpdate.close();        
        }
        this.getParticipantRegData();
        this.toastr.success("Updated successfully!");
        if(this.isRankUpdate){
          this.modalReferenceAdd.close();
          this.modalReferenceUpdate.close();   
          this.isRankUpdate = false;
          }else{
          this.isRankUpdate = false;          
          }
        if(this.isUpdateAttendance){
          this.modalReferenceAdd.close();
          this.modalReferenceUpdate.close();    
          this.isUpdateAttendance = false;
        }else{
          this.isUpdateAttendance = false;
        }          
      } else {
        this.toastr.error("Something went wrong!");
      }
    });
  }

  deleteParticipant() {
    this.mainLoaderIs = true;
    var sendData = {
      participantId: this.participantDeleteId,
      status: "Delete",
    }
    this.http.deleteForm(sendData).subscribe((response: any) => {
      this.mainLoaderIs = false;
      if (response) {      
        this.modalReferenceDelete.close();
        this.modalReferenceOpenConfEmail.close();
        this.modalReferenceOpenImg.close();
        this.modalReferenceOpencertificate.close();
        this.modalReferenceOpenWinnercertificate.close();
        this.modalReferenceOpenReconfirmEmail.close();
        this.getParticipantRegData();
        this.toastr.success("Deleted successfully!");
      } else {
        this.toastr.error("Something went wrong!");
      }
    });
  }

  validationCheck() {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.validEmail = emailRegex.test(this.participantEmailId);
    var mobRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    this.validMobile1 = mobRegex.test(this.participantMobileNo1);
    this.validMobile2 = mobRegex.test(this.participantMobileNo2);
  }

  clickYesParticipated() {
    this.showNextQuestion = false;
    this.activeBtn = "yes";
  }
  clickNoParticipated() {
    this.showNextQuestion = true;
    this.activeBtn = "no";
  }

  changeStd() {
    if (this.participantStd == 'Std 11 & Above') {
      this.participantSchoolName = "";
      this.otherSchool = "";
    } else {
      this.participantAdultName = "";
    }
  }
  saveFormData() {
    this.mainLoaderIs = true;

    this.formSubmit = true;
    if (this.participantMobileNo1 && this.validEmail && this.validMobile1 &&
      this.participantFName &&
      this.participantLName &&
      this.participantEmailId &&
      this.participantStd &&
      this.participantStatus && (this.participantSchoolName || this.otherSchool || this.participantAdultName)

    ) {
      if (this.updateParticipantShow) {
        this.updateUserData();       
        
      } else {
        this.createNewParticipant();
      }
    } else {
      this.mainLoaderIs = false;
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
      this.amount = response.reg_fees;
      this.selectedSchoolId = response.id;

      this.participantSelectedchlname = response.schoolName;
      this.finalSchoolIdSelected = this.selectedSchoolId;
    } else {
      this.toastr.error("Something went wrong!");
    }

  }

  //generation of token
  generateToken() {
    this.participantToken = uid(8);
  }

  async createNewParticipant() {
    this.generateToken();
    if (this.participantStd) {

      if (this.participantStd == 'Std 11 & Above') {

        if (this.participantAdultName) {
          this.formSubmit = false;
          var getAdultchoolObj = this.adultList.find((school) => {
            return school.schoolName === this.participantAdultName
          })
          this.amount = getAdultchoolObj.reg_fees;
          this.participantAdultSchoolId = getAdultchoolObj.id;

          this.participantSelectedchlname = this.participantAdultName;
          this.finalSchoolIdSelected = this.participantAdultSchoolId;

        } else {
          this.formSubmit = true;
        }
      } else {

        if (this.participantSchoolName == 'Others') {
          if (this.otherSchool) {
            this.isOtherSchoolPrvided = true;
            await this.getOtherSchoolData();
            this.formSubmit = false;
          } else {
            this.formSubmit = true;
          }
        } else {
          if (this.participantSchoolName) {
            this.isOtherSchoolPrvided = false;
            this.formSubmit = false;

            var getSchoolObj = this.schoolList.find((school) => {
              return school.schoolName === this.participantSchoolName
            })
            this.amount = getSchoolObj.reg_fees;
            this.getSchoolIdFromObj = getSchoolObj.id;
            this.participantSelectedchlname = this.participantSchoolName;
            this.finalSchoolIdSelected = this.getSchoolIdFromObj;
          } else {
            this.formSubmit = true;
          }

        }
      }

    }



    this.mainLoaderIs = true;
    var sendData = {
      firstName: this.participantFName ? this.participantFName : null,
      middleName: this.participantMName ? this.participantMName : '',
      lastName: this.participantLName ? this.participantLName : null,
      std: this.participantStd ? this.participantStd : null,
      schoolId: this.finalSchoolIdSelected ? this.finalSchoolIdSelected : null,
      primaryContactNo: this.participantMobileNo1 ? this.participantMobileNo1 : null,
      secondaryContactNo: this.participantMobileNo2 ? this.participantMobileNo2 : null,
      emailId: this.participantEmailId ? this.participantEmailId : null,
      question1: this.showNextQuestion == false ? "yes" : "no",
      question2: this.showNextQuestion == true ? this.participantReason : null,
      status: this.participantStatus ? this.participantStatus : "",
      paymentType: this.participantPaymentType,
      payment_status: this.paymentStatus ? this.paymentStatus : "",
      transaction_id: this.participantPaymentID,
      payment_id: this.participantPaymentID,
      participantToken: this.participantToken,
      schoolName: this.otherSchool ? this.otherSchool : null,
      schoolNameSelected: this.participantSelectedchlname,
      type: this.participantStd == "Std 11 & Above" ? "adult" : "others",
      reg_fees: "100",
      
    }
    this.http.getOrder(sendData).subscribe((response: any) => {
      this.mainLoaderIs = false;
      if (response) {      
        this.toastr.success("Successfully created  participant!");
        this.getParticipantRegData();
      } else {
        this.toastr.error("Something went wrong!");
      }
    });
  }

  addPaymentData() {
    var sendData = [{
      participantId: this.createdParticipantId,
      firstName: this.participantFName ? this.participantFName : null,
      middleName: this.participantMName ? this.participantMName : null,
      lastName: this.participantLName ? this.participantLName : null,
      std: this.participantStd ? this.participantStd : null,
      schoolId: this.finalSchoolIdSelected ? this.finalSchoolIdSelected : null,
      primaryContactNo: this.participantMobileNo1 ? this.participantMobileNo1 : null,
      secondaryContactNo: this.participantMobileNo2 ? this.participantMobileNo2 : null,
      emailId: this.participantEmailId ? this.participantEmailId : null,
      question1: this.showNextQuestion == false ? "yes" : "no",
      question2: this.showNextQuestion == true ? this.participantReason : null,
      status: this.participantStatus ? this.participantStatus : "",
      paymentType: this.participantPaymentType,
      payment_status: this.paymentStatus ? this.paymentStatus : "",
      transaction_id: this.participantPaymentID,
      participantToken: this.participantToken,
      schoolName: this.otherSchool ? this.otherSchool : null,
      schoolNameSelected: this.participantSelectedchlname,
      type: this.participantStd == "Std 11 & Above" ? "adult" : "others",
      reg_fees: "100",
    }]
    this.http.addPaymentInfo(sendData).subscribe((response: any) => {
      this.mainLoaderIs = false;
      if (response) {
        this.toastr.success("Successfully created  participant!");
        this.getParticipantRegData();
        this.modalReferenceAdd.close();
        this.modalReferenceOpenReconfirmEmail.close();     
        this.modalReferenceDelete.close();
        this.modalReferenceOpenConfEmail.close();
        this.modalReferenceOpenImg.close();
        this.modalReferenceOpencertificate.close();
        this.modalReferenceOpenWinnercertificate.close();
      } else {
        this.toastr.error("Something went wrong!");
      }
    });
  }

  pageChanged(event): void {
    this.offset = (event - 1) * this.pageSize;
    this.getParticipantRegData();
  }

  applyfilter() {
    this.getParticipantRegData();
  }

  resetData() {
    this.participantFullName = "";
    this.filterStatus = "";
    this.filterPaymentId = "";
    this.filtePaymentStatus = "";
    this.paidAmountVal = "";
    this.filterSTD = "";
    this.filterSchoolName = "";
    this.getParticipantRegData();
  }

  getParticipantRegData() {
    this.mainLoaderIs = true;
    var sendData = {
      "name": this.participantFullName,
      "status": this.filterStatus,
      "paymentId": this.filterPaymentId,
      "amount": this.paidAmountVal,
      "paymentStatus": this.filtePaymentStatus,
      "limit": this.pageSize,
      "offset": this.offset,
      "std": this.filterSTD,
      "schoolName": this.filterSchoolName,
    };
    this.http.getParticipantRegisteredData(sendData).subscribe((response: any) => {
      if (response.success == true) {
        this.participatedList = response.result;
        this.paymentMethod = response.PaymentMethod;
        this.totalCount = response.totalCount;         
        

        
      } else {
        this.toastr.error("Something went wrong!");
      }
      this.mainLoaderIs = false;
    });
  }

  getPaymentDetails(participant) {
    this.paymentReqId = participant.payment_request_id;
    this.paymentId = participant.payment_id;
    // this.mainLoaderIs = true;
    this.paymentResponse = true;
    var sendData = {
      paymentRequestId: this.paymentReqId,
      paymentId: this.paymentId
    }
    this.http.getPaymentDetailsInstamojo(sendData).subscribe((response: any) => {
      // this.mainLoaderIs = false;
      if (response) {
        this.paymentResponse = false;
        // if(response.success){
        if (response.success == false) {
          this.responseFalse = true;
          this.paymentResponsePending = "Payment Pending";
          // }
        } else {
          this.responseFalse = false;

          this.paymentStatusInstamojoAmount = response.amount;
          this.paymentStatusInstamojoEmail = response.buyer;
          this.paymentStatusInstamojoFailure = response.failure;
          this.paymentStatusInstamojoCardType = response.instrumentType;
          this.paymentStatusInstamojoTime = response.paidOutTime;
          this.paymentStatusInstamojoPaymentID = response.paymentId;
          this.paymentStatusInstamojoStatus = response.status;

          if (this.paymentStatusInstamojoFailure != null) {
            this.failureReason = response.failure.reason;
            this.failureMessage = response.failure.message;
          }
        }
      } else {
        this.toastr.error("Something went wrong!");
      }
    });
  }

  get_parti_name_list() {
    this.http.getAllParticipantsName().subscribe((result: any) => {
      this.tempStoreNameList = result.result;
      this.storeNameList = this.tempStoreNameList.map(function (obj) {
        return obj.firstName + " " + obj.lastName;
      });
    });
  }

  searchName = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$1.pipe(
      filter(() => !this.instance1.isPopupOpen())
    );
    const inputFocus$ = this.focus$1;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ""
          ? this.storeNameList
          : this.storeNameList.filter(
            (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
          )
        ).slice(0, 10)
      )
    );
  };

  searchSchool = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$2.pipe(
      filter(() => !this.instance2.isPopupOpen())
    );
    const inputFocus$ = this.focus$2;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ""
          ? this.schoolNameList
          : this.schoolNameList.filter(
            (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
          )
        ).slice(0, 10)
      )
    );
  };

  copyPymntIdForRef(getIdTxt) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = getIdTxt;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success("Successfully Copied!");
  }

  
  getMaintenanceMode(){
    var sendData={
      maintenance: this.maintenanceMode ? 1 : 0,
      userId:this.loggedUserObject.user.id
    }
    this.mainLoaderIs = true;
    this.http.updateMaintenanceMode(sendData).subscribe((response: any) => {
        if (response) {
          if(this.maintenanceMode){
            this.toastr.success("Maintenance Mode is On!");
          }else{
            this.toastr.success("Maintenance Mode is Off!");
          }
         
          sessionStorage.setItem("sessionMaintenance",JSON.stringify(this.maintenanceMode) );
          // console.log(this.finalMultiparticipantList);
    
        

        } else {
          this.toastr.error("Something went wrong!");
          
        }
        this.mainLoaderIs = false;
      });
  }

  sendEmail(pToken){
    console.log(pToken)
    this.partToken = pToken
    this.sendBulkReconfirmationEmail();
  }
  sendBulkReconfirmationEmail(){
    var sendData = {
     "participantToken":this.partToken,

    };
    
    this.mainLoaderIs = true;
    this.http.getBulkEmail(sendData).subscribe((data: any) => {
      if (data.success) {
        this.mainLoaderIs = false;
        this.toastr.success("Sent re-confirmation emails successfully");   
        this.modalReferenceOpenReconfirmEmail.close();     
        this.modalReferenceDelete.close();
        this.modalReferenceOpenConfEmail.close();
        this.modalReferenceOpenImg.close();
        this.modalReferenceOpencertificate.close();
        this.modalReferenceOpenWinnercertificate.close();
        
        
      } else {
        this.toastr.warning("Something went wrong!");
      }
      this.mainLoaderIs = false;
    });
  }
  
  openReconfirmEmail(reconfirmEmail) {
    this.modalReferenceOpenReconfirmEmail = this.modalService.open(reconfirmEmail, { size: "sm" });
  }

  DownloadFilteredParticipantsData() {    
    var sendData = {
      "name": this.participantFullName,
      "status": this.filterStatus,
      "paymentId": this.filterPaymentId,
      "amount": this.paidAmountVal,
      "paymentStatus": this.filtePaymentStatus,      
      "std": this.filterSTD,
      "schoolName": this.filterSchoolName,
    };
    this.http.dashboardExceldownload(sendData).subscribe((result: any) => {
        var fileUrl = this.http.rootURL + "/" + result.path;
        window.open(fileUrl);
      });
  }


 sendWinnerCertificate() {   
    this.mainLoaderIs = true;
    var sendData = {
      participantToken: this.sendParticipantToken, 
      certificateType: this.sendSingleCertificate == 'participant'? 'participant':'winner',
    }
    this.http.sendSingleWinnerCertificateMail(sendData).subscribe((response: any) => {
      this.mainLoaderIs = false;
      // console.log(response,"responseresponseresponseresponseresponse");      
      console.log(response);
      if (response.success == true) { 
        if(this.modalReferenceOpencertificate){
          this.modalReferenceOpencertificate.close();
        } 
        if(this.modalReferenceOpenWinnercertificate){
          this.modalReferenceOpenWinnercertificate.close();
        }   
        this.toastr.success("Updated successfully!");              
      } else {
        this.toastr.error("Something went wrong!");
      }
    });
  } 

  sendEmailSlotting(slottingId){
    if(slottingId){
      this.mailSlottingid = slottingId
    }
    console.log(this.mailSlottingid)
    this.sendBulkslotEmail();

  }
  sendBulkslotEmail(){
    var sendData = {
      "participantToken":this.mailSlottingid,
 
     };
    this.mainLoaderIs = true;
    this.http.sendBulkSlotEmail(sendData).subscribe((data: any) => {
      if (data.success) {
        this.mainLoaderIs = false;
        this.toastr.success("slot emails sent successfully");    
      } else {
        this.toastr.warning("Something went wrong!");
      }
      this.mainLoaderIs = false;
    });
  }
}
