import { Component, OnInit, TemplateRef, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "../service/http.service";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
// import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

import * as XLSX from 'xlsx';
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
type AOA = any[][];
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./../certificate.css'],
  encapsulation: ViewEncapsulation.None,
})

export class CertificateComponent implements OnInit {
  mainLoaderIs: boolean = false;
  showSendBulkModal: boolean = false;
  isSendBulk: boolean = false;
  showSendBulkModalWinner: boolean = false;
  isSendBulkWinner: boolean = false;
  isCerti04: boolean = true;
  isShow = false;
  stdSelectedArr: any = [];
  rankSelectedArr: any = [];
  isShowRank: boolean = false;
  modalReference: NgbModalRef;
  isSelectTab: any = "participant";
  emptySelectedPill: boolean = true;
  selectedStdJr: any;
  selectedStdSr: any;
  selectedStd1: any;
  selectedStd2: any;
  selectedStd3: any;
  selectedStd4: any;
  selectedStd5: any;
  selectedStd6: any;
  selectedStd7: any;
  selectedStd8: any;
  selectedStd9: any;
  selectedStd10: any;
  selectedStd11: any;
  selectedRank1: any;
  selectedRank2: any;
  selectedRank3: any;
  selectedMotivational: any;
  selectedNursery:any;
  selectedStdNursery:any
  certificateStatusArr: any = [];
  modalRefpassreset: any;
  certificateStatusOverall: any;
  dLogo:boolean = false;
  pLogo:boolean = false;
  sendButoon:boolean = true;
 
  constructor(
    private modalService: NgbModal,
    public http: HttpService,
    private router: Router,
    public toastr: ToastrService,
    // config: NgbTooltipConfig,

  ) { }


  ngOnInit(): void {
    this.dLogo = false;
    this.pLogo = false;
    setInterval(() => {
      this.certificateStatusProgressData();
    }, 10000);
      
  }


  sendBulkEmail() {
    this.mainLoaderIs = true;
    this.http.getBulkEmailCertificate().subscribe((data: any) => {
      if (data.success) {
        this.toastr.success("Sent emails successfully");
        this.showSendBulkModal = false;
        this.isSendBulk = false;
      } else {
        this.toastr.warning("Something went wrong!");
      }
      this.mainLoaderIs = false;
    });
  }
  sendBulkEmailOfWinner() {
    this.mainLoaderIs = true;
    this.http.getWinnersCertificateEmail().subscribe((data: any) => {
      if (data.success) {
        this.toastr.success("Sent emails successfully");
        this.showSendBulkModalWinner = false;
        this.isSendBulkWinner = false;
      } else {
        this.toastr.warning("Something went wrong!");
      }
      this.mainLoaderIs = false;
    });
  }

  showStdCheckboxes() {
    if (this.isShow) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }

  showRankCheckboxes() {

    if (this.isShowRank) {
      this.isShowRank = false;
    } else {
      this.isShowRank = true;
    }
  }

  onSelectStdOpen(isStd, std) {

    if (this.stdSelectedArr.length != 0) {
      if( std == 'all'){
        this.stdSelectedArr.push('Jr Kg' , 'Sr Kg' , 'Std 1','Std 2','Std 3','Std 4','Std 6','Std 5','Std 7','Std 8' ,'Std 9','Std 10','Std 11 & Above')

      }
      if (isStd) {
       
        let checkDup = this.stdSelectedArr.filter((ele) => {
          return ele == std;
        })
        if (checkDup.length == 0) {
          this.stdSelectedArr.push(std);
        }
      } else {
        let falseDup = this.stdSelectedArr.filter((ele) => {
          return ele != std;
        })
        this.stdSelectedArr = falseDup;
      }

    } else {
      if( std == 'all'){
        this.stdSelectedArr.push('Jr Kg' , 'Sr Kg' , 'Std 1','Std 2','Std 3','Std 4','Std 6','Std 5','Std 7','Std 8' ,'Std 9','Std 10','Std 11 & Above')

      }
      this.stdSelectedArr.push(std);
    }
   if(this.stdSelectedArr.length){
     this.sendButoon = false;
   }else{
     this.sendButoon = true;
   }
   
   
  }
 

  onSelectRankOpen(isrank, rank) {
    if (this.rankSelectedArr.length != 0) {
      if (isrank) {
        let checkDupRank = this.rankSelectedArr.filter((ele) => {
          return ele == rank;
        })
        if (checkDupRank.length == 0) {
          this.rankSelectedArr.push(rank);
        }
      } else {
        let falseDupRank = this.rankSelectedArr.filter((ele) => {
          return ele != rank;
        })
        this.rankSelectedArr = falseDupRank;
      }
    } else {
      if(rank == 'all'){
        this.rankSelectedArr.push('1st','2nd','3rd','motivational');

      }
      this.rankSelectedArr.push(rank);
    }
    if(this.rankSelectedArr.length){
      this.sendButoon = false;
    }else{
      this.sendButoon = true;
    }
  }

  clearDropDown(){
    this.selectedStdJr = false;
    this.selectedStdSr  = false;
    this.selectedStd1 = false;
    this.selectedStd2= false;
    this.selectedStd3= false;
    this.selectedStd4= false;
    this.selectedStd5= false;
    this.selectedStd6= false;
    this.selectedStd7= false;
    this.selectedStd8= false;
    this.selectedStd9= false;
    this.selectedStd10= false;
    this.selectedStd11= false;
    this.selectedRank1= false;
    this.selectedRank2= false;
    this.selectedRank3= false;
    this.selectedMotivational = false;

  }

  sendConfirmationEmail() {
    this.mainLoaderIs = true;
    var sendData = {
      std: this.stdSelectedArr,
      rank: this.rankSelectedArr,
      certificateType: this.isSelectTab,
    }
    this.sendButoon = true;
    this.http.sendWinnerCertificateMail(sendData).subscribe((response: any) => {
      this.mainLoaderIs = false;
      if (response.success == true) {
        // this.modalReference.close();
        this.mainLoaderIs = false;
        this.toastr.success("Certificate sent successfully!");
        
        this.stdSelectedArr = [];
        this.rankSelectedArr = [];
        this.sendButoon = true;
        this.emptySelectedPill = false;
        // window.location.reload()
        this.dLogo = true;
        this.pLogo = true;
      } else {
      
          // this.toastr.error(response.msg);
          this.toastr.error('Please wait Previous progress is running');
          this.dLogo = true;
        this.pLogo = true;
      }
      this.clearDropDown();
    });
  }

  changeTab(event) {
    if (event.nextId == '0') {
      this.isSelectTab = 'participant'
    }
    else if (event.nextId == '1') {
      this.isSelectTab = 'winner'
    }

  }

  modelBoxStatus(modelbox: any) {
    this.modalRefpassreset = this.modalService.open(modelbox, { ariaLabelledBy: 'modal-basic-title' });
    this.certificateStatusProgressData()
    // this.closeShortModal();
  }
  // closeShortModal() {
  //   this.certificateStatus = false;
  // }

  certificateStatusProgressData() {
    this.http.certificateStatusData().subscribe((response: any) => {
      if (response) {
        console.log(response);
        this.certificateStatusArr = response.result;
        this.certificateStatusOverall = response.overAllStatus;
        console.log(this.certificateStatusOverall);
        console.log(response.msg);
        
      } else {
        this.mainLoaderIs = false;
        this.toastr.error("Something went wrong!");
      }
    })

  }


}
