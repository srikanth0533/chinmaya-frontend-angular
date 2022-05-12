import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../../service/http.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject, merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from "rxjs/operators";

@Component({
  selector: "app-participant-list",
  templateUrl: "./participant-list.component.html",
  styleUrls: ["./participant-list.component.css"],
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
export class ParticipantListComponent implements OnInit {
  participantsList: any;
  partiFilterObj: any;
  partiFilteringData: any;
  tempStoreBranchList: any;
  tempStoreContactList: any;
  tempStoreEmailList: any;
  tempStoreNameList: any;
  tempStoreSchoolList: any;
  tempStoreStatusList: any;
  mainLoaderIs: boolean;
  filteringData: any;
  numberFunction: any;
  pageOffset: any;
  pageNumber: any;
  pagination: any;
  total: any;
  id: any;
  username: any;
  participantName: any;
  contactNo: any;
  emailId: any;
  std: any;
  isSTD: any;
  div: any;
  schoolName: any;
  isSchoolName: any;
  branchName: any;
  confirmStatus: any;
  eventName: string = "Geeta Chanting";
  email01AttemptedDate: any;
  cleanRNo: any;
  cleanOriginalEmail: any;
  cleanUpdateComments: any;
  email01PMAAcceptanceStatus: any;
  email01PMADeliveryStatus: any;
  email03PMAAcceptanceStatus: any;
  email03PMADeliveryStatus: any;
  email02Reconfirmation: any;
  email02PMAAcceptanceStatus: any;
  email02PMADeliveryStatus: any;
  contactNoEdited: any;
  slot: any;
  schedule: any;
  zoomLink: any;
  status: any;
  certificationLink: any;
  hideShowInput: boolean = false;
  getUserData: any;
  showSchoolInput: boolean = false;
  addSchoolNameBtn: boolean = true;
  dropdownSchool: boolean = true;
  addDropSchoolNameBtn: boolean = false;
  inputSTD: boolean = false;
  dropSTD: boolean = true;
  addStdNameBtn: boolean = true;
  addDropStdNameBtn: boolean = false;
  model: any;
  storeSchoolList: any;
  storeStatusList: any;
  storeNameList: any;
  storeEmailList: any;
  storeContactList: any;
  @ViewChild("instance1", { static: true }) instance1: NgbTypeahead;
  @ViewChild("instance2", { static: true }) instance2: NgbTypeahead;
  @ViewChild("instance3", { static: true }) instance3: NgbTypeahead;
  @ViewChild("instance4", { static: true }) instance4: NgbTypeahead;
  @ViewChild("instance5", { static: true }) instance5: NgbTypeahead;
  @ViewChild("instance6", { static: true }) instance6: NgbTypeahead;
  focus$1 = new Subject<string>();
  focus$2 = new Subject<string>();
  focus$3 = new Subject<string>();
  focus$4 = new Subject<string>();
  focus$5 = new Subject<string>();
  focus$6 = new Subject<string>();
  click$1 = new Subject<string>();
  click$2 = new Subject<string>();
  click$3 = new Subject<string>();
  click$4 = new Subject<string>();
  click$5 = new Subject<string>();
  click$6 = new Subject<string>();
  sortChange: boolean = true;
  isStatus: any;
  formSubmit: boolean;
  modalReference: NgbModalRef;
  validEmail: any;
  validMobile: any;
  oldEmailId: any;
  isSendBulk: boolean = false;
  showSendBulkModal: boolean = false;
  confirmStatusEmail02: any;
  filteredDownload = false;
  downloadData = true;
  eventDate: any;
  eventStartTime: any;
  isStdFilter: boolean = true;
  isPhaseFilter: boolean = true;
  batchId: any;
  isAllocationStatus: boolean = false;
  constructor(
    private toastr: ToastrService,
    public http: HttpService,
    private modalService: NgbModal
  ) {
    this.mainLoaderIs = false;
    this.participantsList = [];
    this.partiFilterObj = {
      schoolName: "All",
      branch: "All",
      std: "All",
      eventName: "All",
      status: "ACTIVE",
      cnfStatus: "All",
      name: "All",
      emailid: "All",
      contactNo: "All",
      phase: "All",
      subscribe: "All",
      webStats: "All",
      scheduleFilter: "All",
      slotFilter: "All",
      allocationStatus: true,
    };
    this.partiFilteringData = {
      schools: [],
      branch: [],
      std: [],
      event: [],
    };
    this.tempStoreBranchList = [];
    this.filteringData = {
      schoolName: "All",
      branch: "All",
      std: "All",
      event: "All",
      offset: 0,
      max: 100,
    };
    this.pageOffset = {
      offset: 0,
      currentPage: { min: 0, max: 99 },
    };
    this.pageNumber = [];
    this.numberFunction = {
      offsets: [],
    };
    //if facing any error releated to total change this.total = 1;
    this.total = NaN;
    this.pagination = 0;
  }

  ngOnInit() {
    this.mainLoaderIs = true;
    this.get_filter_list();
    this.reset_list("onload");
    this.reset_list("school");
    this.getUserData = sessionStorage.getItem("userData");
    // console.log(this.getUserData);
    // console.log(sessionStorage.getItem("userData"));
  }
  hideShowDownloadDataButton() {
    if (
      this.partiFilterObj.name != "All" ||
      this.partiFilterObj.emailid != "All" ||
      this.partiFilterObj.contactNo != "All" ||
      this.partiFilterObj.schoolName != "All" ||
      this.partiFilterObj.std != "All" ||
      this.partiFilterObj.phase != "All" ||
      this.confirmStatusEmail02 != "All"
    ) {
      this.filteredDownload = true;
      this.downloadData = false;
    }
  }
  resetFilter() {
    this.partiFilterObj = {
      schoolName: "All",
      branch: "All",
      std: "All",
      eventName: "All",
      status: "ACTIVE",
      cnfStatus: "All",
      name: "All",
      emailid: "All",
      scheduleFilter: null,
      slotFilter: null,
      contactNo: "All",
      phase: "All",
      subscribe: "All",
      webStats: "All",
      allocationStatus: true,
    };
    this.filteredDownload = false;
    this.downloadData = true;
    this.getParticipantsList("onload", "", "");
    this.reset_list("onload");
  }

  searchSchool = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$3.pipe(
      filter(() => !this.instance3.isPopupOpen())
    );
    const inputFocus$ = this.focus$3;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ""
          ? this.storeSchoolList
          : this.storeSchoolList.filter(
            (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
          )
        ).slice(0, 10)
      )
    );
  };
  searchStatus = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$5.pipe(
      filter(() => !this.instance5.isPopupOpen())
    );
    const inputFocus$ = this.focus$5;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ""
          ? this.storeStatusList
          : this.storeStatusList.filter(
            (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
          )
        ).slice(0, 10)
      )
    );
  };
  searchStatusModel = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$6.pipe(
      filter(() => !this.instance6.isPopupOpen())
    );
    const inputFocus$ = this.focus$6;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ""
          ? this.storeStatusList
          : this.storeStatusList.filter(
            (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
          )
        ).slice(0, 10)
      )
    );
  };
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
  searchEmail = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$4.pipe(
      filter(() => !this.instance4.isPopupOpen())
    );
    const inputFocus$ = this.focus$4;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ""
          ? this.storeEmailList
          : this.storeEmailList.filter(
            (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
          )
        ).slice(0, 10)
      )
    );
  };
  searchContact = (text$: Observable<string>) => {
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
          ? this.storeContactList
          : this.storeContactList.filter((v) => v.indexOf(term) > -1)
        ).slice(0, 10)
      )
    );
  };

  showSchoolnameInput() {
    this.showSchoolInput = true;
    this.addSchoolNameBtn = false;
    this.dropdownSchool = false;
    this.addDropSchoolNameBtn = true;
  }

  showSchoolnameDrop() {
    this.dropdownSchool = true;
    this.addDropSchoolNameBtn = false;
    this.addSchoolNameBtn = true;
    this.showSchoolInput = false;
  }
  showStdnameInput() {
    this.inputSTD = true;
    this.dropSTD = false;
    this.addStdNameBtn = false;
    this.addDropStdNameBtn = true;
  }
  showStdnameDrop() {
    this.inputSTD = false;
    this.dropSTD = true;
    this.addStdNameBtn = true;
    this.addDropStdNameBtn = false;
  }
  // open(shortContent) {
  //   this.modalReference = this.modalService.open(shortContent, { size: "lg" });
  // }
  openLg(longContent, type, dataList) {
    var STD;
    var SCHOOL;

    if (type == "edit") {
      // if (this.isSTD != "") {
      //   STD = this.isSTD;
      // } else {
      //   STD = this.std;
      // }

      // if (dataList.isSchoolName != "") {
      //   SCHOOL = dataList.isSchoolName;
      // } else {
      //   SCHOOL = dataList.schoolName;
      // }
      console.log(STD, SCHOOL);
      this.id = dataList.id;
      this.participantName = dataList.name;
      this.contactNo = dataList.contactNo;
      this.emailId = dataList.emailid;
      this.oldEmailId = dataList.emailid;
      this.isSTD = dataList.std;
      this.div = dataList.div;
      this.isSchoolName = dataList.schoolName;
      this.branchName = dataList.branch;
      this.confirmStatus = dataList.confirmStatus == 1 ? true : false;
      // this.eventName = dataList.eventName;
      this.email01AttemptedDate = dataList.email01AttemptedDate;
      this.cleanRNo = dataList.cleanRNo;
      this.cleanOriginalEmail = dataList.cleanOriginalEmail;
      this.cleanUpdateComments = dataList.cleanUpdateComments;
      this.email01PMAAcceptanceStatus = dataList.email01PMAAcceptanceStatus;
      this.email01PMADeliveryStatus = dataList.email01PMADeliveryStatus;
      this.email02Reconfirmation =
        dataList.email02Reconfirmation == "Yes" ? true : false;
      this.contactNoEdited = dataList.contactNoEdited == "yes" ? true : false;
      this.slot = dataList.batchMasterId ? dataList.batchMasterId : null;
      this.schedule = dataList.schedule ? dataList.schedule : "";
      console.log(dataList.batch, "dataList.batchMasterId");
      console.log(dataList.schedule, "dataList.schedule");
      this.zoomLink = dataList.zoomLink;
      this.certificationLink = dataList.certificationLink;
      this.isStatus = dataList.status;
      this.email02PMAAcceptanceStatus = dataList.email02PMAAcceptanceStatus;
      this.email02PMADeliveryStatus = dataList.email02PMADeliveryStatus;
      this.hideShowInput = true;
    } else {
      this.id;
      this.participantName = "";
      this.contactNo = "";
      this.emailId = "";
      this.std = "";
      this.isSTD = "";
      this.div = "";
      this.schoolName = "";
      this.isSchoolName = "";
      this.branchName = "";
      this.confirmStatus = false;
      // this.eventName = "";
      this.email01AttemptedDate = "";
      this.cleanRNo = "";
      this.cleanOriginalEmail = "";
      this.cleanUpdateComments = "";
      this.email01PMAAcceptanceStatus = "";
      this.email01PMADeliveryStatus = "";
      this.email02Reconfirmation = false;
      this.email02PMAAcceptanceStatus = "";
      this.email02PMADeliveryStatus = "";
      this.contactNoEdited = false;
      this.slot = null;
      this.schedule = "";
      this.zoomLink = "";
      this.certificationLink = "";
      this.isStatus = "ACTIVE";
      this.hideShowInput = false;
    }
    this.getSlotEventDateList();
    this.modalReference = this.modalService.open(longContent, { size: "lg" });
  }

  reset_list(getParam: string) {
    console.log(this.partiFilterObj.subscribe, "this.partiFilterObj.subscribe");
    this.participantsList = [];
    this.mainLoaderIs = true;

    // if (getParam == "school") {
    //   this.partiFilterObj.branch = "all";
    // }
    // if (getParam == "name") {
    //   this.partiFilterObj.name = "all";
    // }
    // console.log(this.partiFilterObj.contactNo);
    if (this.partiFilterObj.cnfStatus == "All") {
      this.confirmStatusEmail02 = "All";
    } else if (this.partiFilterObj.cnfStatus == "CONFIRMED") {
      this.confirmStatusEmail02 = true;
    } else {
      this.confirmStatusEmail02 = null;
    }
    if (this.partiFilterObj.allocationStatus == "true") {
      this.partiFilterObj.allocationStatus = true;
    } else if (this.partiFilterObj.allocationStatus == "null") {
      this.partiFilterObj.allocationStatus = null;
    }
    var isSubscribe = false;

    if (this.partiFilterObj.subscribe != "All") {
      if (this.partiFilterObj.subscribe == "subscribe") {
        isSubscribe = false;
      } else if (this.partiFilterObj.subscribe == "unsubscribe") {
        isSubscribe = true;
      }
    }

    var isWebStats = false;
    if (this.partiFilterObj.webStats != "All") {
      if (this.partiFilterObj.webStats == "entered") {
        isWebStats = true;
      } else if (this.partiFilterObj.webStats == "nonEntered") {
        isWebStats = false;
      }
    }

    let data = {
      schoolName: this.partiFilterObj.schoolName,
      branch: this.partiFilterObj.branch,
      std: this.partiFilterObj.std,
      event: this.partiFilterObj.eventName,
      status: this.partiFilterObj.status,
      email02Reconfirmation: this.confirmStatusEmail02,
      name: this.partiFilterObj.name,
      emailId: this.partiFilterObj.emailid,
      contactNo: this.partiFilterObj.contactNo,
      allocationStatus: this.partiFilterObj.allocationStatus,
      phase: this.partiFilterObj.phase,
      unsubscribe: this.partiFilterObj.subscribe == "All" ? "All" : isSubscribe,
      website_status: this.partiFilterObj.webStats == "All" ? "All" : isWebStats,
      eventDate: this.partiFilterObj.slotFilter
        ? this.partiFilterObj.slotFilter
        : "All",
      slot: this.partiFilterObj.scheduleFilter
        ? this.partiFilterObj.scheduleFilter
        : "All",
      // status:"",
      // name:"",
      // emailId:"",
      // contactNo:"",
    };

    this.http.getParticipantCount(data).subscribe((data: any) => {
      if (data.success) {
        this.getParticularSchoolBranch(data.branch);
        if (data.total > 0) {
          this.total = data.total;
          this.numberFunction.offsets = (data.total / 100)
            .toString()
            .split(".");
          if (this.numberFunction.offsets[1] === undefined) {
            this.numberFunction.offsets.push(0);
          }
          this.numberFunction.offsets[1] = parseInt(
            this.numberFunction.offsets[1]
          );
          this.numberFunction.offsets[0] = parseInt(
            this.numberFunction.offsets[0]
          );
          if (
            this.numberFunction.offsets[0] == 0 &&
            this.numberFunction.offsets[1] < 100
          ) {
            this.pageNumber = [this.numberFunction.offsets[1]];
          } else {
            var temp = {
              value: "",
              offset: 0,
            };
            this.pageNumber = [];
            for (let i = 0; i <= this.numberFunction.offsets[0]; i++) {
              temp = {
                value:
                  i > 0
                    ? temp.offset + 101 + "-" + (temp.offset + 200)
                    : "1-100",
                offset: i > 0 ? temp.offset + 100 : 0,
              };
              this.pageNumber.push(temp);
            }
            let len = this.pageNumber.length - 1;
            if (this.pageNumber[len].offset === this.total) {
              this.pageNumber.pop(this.pageNumber[len]);
            } else {
              let gen = {
                offset: this.total - this.numberFunction.offsets[1],
                value: this.pageNumber[len].offset + 1 + "-" + this.total,
              };
              this.pageNumber[len] = gen;
            }
          }
          this.getParticipantsList("onload", "", "");
        } else {
          this.total = 0;
          this.toastr.error("No data found");
          this.mainLoaderIs = false;
        }
      } else {
        this.total = 0;
        this.toastr.error("No data found");
        this.mainLoaderIs = false;
      }
    });
  }
  validationCheck() {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.validEmail = emailRegex.test(this.emailId);
    var mobRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    this.validMobile = mobRegex.test(this.contactNo);
    console.log(this.validMobile);
  }

  getParticipantsList(task: string, column, sortby) {
    if (task === "onload") {
      this.pageOffset = {
        offset: 0,
      };
      this.pagination = this.pageOffset.offset;
    }
    if (task === "next") {
      if (this.pageOffset.offset + 100 < this.total) {
        this.pageOffset = {
          offset: this.pageOffset.offset + 100,
        };
        this.pagination = this.pageOffset.offset;
      } else {
        this.toastr.warning("Reached end");
        return false;
      }
    }
    if (task === "prev") {
      if (this.pageOffset.offset - 100 >= 0) {
        this.pageOffset = {
          offset: this.pageOffset.offset - 100,
        };
        this.pagination = this.pageOffset.offset;
      } else {
        this.toastr.warning("Reached start");
        return false;
      }
    }
    if (task === "start") {
      if (this.pageOffset.offset - 1 <= 0) {
        this.toastr.info("Already at first page");
        return false;
      } else {
        this.pageOffset = {
          offset: 0,
        };
        this.pagination = this.pageOffset.offset;
      }
    }
    if (task === "end") {
      if (this.pageOffset.offset >= this.total - 100) {
        this.toastr.info("Already at last page");
        return false;
      } else {
        if (this.numberFunction.offsets[1] === 0) {
          this.pageOffset = {
            offset: this.total - 100,
          };
        } else {
          this.pageOffset = {
            offset: this.total - this.numberFunction.offsets[1],
          };
        }
        this.pagination = this.pageOffset.offset;
      }
    }
    if (task === "pageNo") {
      this.pageOffset = {
        offset: parseInt(this.pagination),
      };
      this.pagination = this.pageOffset.offset;
    }

    if (this.partiFilterObj.cnfStatus == "All") {
      this.confirmStatusEmail02 = "All";
    } else if (this.partiFilterObj.cnfStatus == "CONFIRMED") {
      this.confirmStatusEmail02 = true;
    } else {
      this.confirmStatusEmail02 = null;
    }

    if (this.partiFilterObj.allocationStatus == "true") {
      this.partiFilterObj.allocationStatus = true;
    } else if (this.partiFilterObj.allocationStatus == "null") {
      this.partiFilterObj.allocationStatus = null;
    }

    var isSubscribe = false;

    if (this.partiFilterObj.subscribe != "All") {
      if (this.partiFilterObj.subscribe == "subscribe") {
        isSubscribe = false;
      } else if (this.partiFilterObj.subscribe == "unsubscribe") {
        isSubscribe = true;
      }
    }

    var isWebStats = false;
    if (this.partiFilterObj.webStats != "All") {
      if (this.partiFilterObj.webStats == "entered") {
        isWebStats = true;
      } else if (this.partiFilterObj.webStats == "nonEntered") {
        isWebStats = false;
      }
    }

    this.mainLoaderIs = true;
    var ticket_filter_obj = {
      schoolName: this.partiFilterObj.schoolName,
      // branch: this.partiFilterObj.branch,
      std: this.partiFilterObj.std,
      // event: this.partiFilterObj.eventName,
      // schoolName: "all",
      // std: "all",
      email02Reconfirmation: this.confirmStatusEmail02,
      status: this.partiFilterObj.status,
      name: this.partiFilterObj.name,
      emailId: this.partiFilterObj.emailid,
      contactNo: this.partiFilterObj.contactNo,
      column: column ? column : "name",
      sortBy: sortby,
      phase: this.partiFilterObj.phase,
      unsubscribe: this.partiFilterObj.subscribe == "All" ? "All" : isSubscribe,
      website_status: this.partiFilterObj.webStats == "All" ? "All" : isWebStats,
      eventDate: this.partiFilterObj.slotFilter
        ? this.partiFilterObj.slotFilter
        : "All",
      slot: this.partiFilterObj.scheduleFilter
        ? this.partiFilterObj.scheduleFilter
        : "All",
      offset: this.pageOffset.offset,
      max: 100,
      allocationStatus: this.partiFilterObj.allocationStatus,
    };
    this.http.getPartiList(ticket_filter_obj).subscribe((data: any) => {
      if (data.success === true) {
        this.sortChange = !this.sortChange;
        this.participantsList = data.result;
        this.participantsList.forEach((participant) => {
          if (participant.confirmStatus == 1) {
            participant.confirmStatus = "Yes";
          } else {
            participant.confirmStatus = "No";
          }
          if (participant.email01PMAAcceptanceStatus == "NOT_TO_BE_SENT") {
            participant.email01PMAAcceptanceStatus = "Not to be sent";
          }
          if (participant.contactNoEdited == 1) {
            participant.contactNoEdited = "Yes";
          } else if (participant.contactNoEdited == 0) {
            participant.contactNoEdited = "No";
          }
          if (participant.isNameEdited == 1) {
            participant.isNameEdited = "Yes";
          } else if (participant.isNameEdited == 0) {
            participant.isNameEdited = "No";
          }
          if (participant.email02Reconfirmation == 1) {
            participant.email02Reconfirmation = "Yes";
          } else if (participant.email02Reconfirmation == 0) {
            participant.email02Reconfirmation = "No";
          }
          if (participant.unsubscribe == 1) {
            participant.unsubscribe = "Yes";
          } else if (participant.unsubscribe == 0) {
            participant.unsubscribe = "No";
          }

          this.hideShowDownloadDataButton();
          if (this.partiFilterObj.std != "All") {
            this.isStdFilter = false;
          }
          if (this.partiFilterObj.phase != "All") {
            this.isPhaseFilter = false;
          }
        });
      } else {
        this.toastr.warning("Something went wrong!");
      }
      this.mainLoaderIs = false;
    });
  }

  get_filter_list() {
    this.http.getFilterList().subscribe((result: any) => {
      this.partiFilteringData = result;
      this.tempStoreBranchList = result.branch;
      this.tempStoreContactList = result.contactNos;
      this.tempStoreEmailList = result.emailIds;
      this.tempStoreNameList = result.participantsNames;
      this.tempStoreSchoolList = result.schools;
      this.tempStoreStatusList = result.status;
      this.storeSchoolList = this.tempStoreSchoolList.map(function (obj) {
        return obj.schoolName;
      });
      this.storeStatusList = this.tempStoreStatusList.map(function (obj) {
        return obj.status;
      });
      this.storeNameList = this.tempStoreNameList.map(function (obj) {
        return obj.name;
      });
      this.storeEmailList = this.tempStoreEmailList.map(function (obj) {
        return obj.emailid;
      });
      this.storeContactList = this.tempStoreContactList.map(function (obj) {
        return obj.contactNo;
      });
    });
  }

  getParticularSchoolBranch(getBranchList: any) {
    if (this.partiFilterObj.schoolName == "All" || getBranchList == undefined) {
      this.partiFilteringData.branch = this.tempStoreBranchList;
    } else {
      this.partiFilteringData.branch = getBranchList;
    }
  }

  /* Edit */
  getEditData(type) {
    // var STD;
    // var SCHOOL;
    // if (this.partiFilterObj.std != "") {
    //   STD = this.partiFilterObj.std;
    // } else if (this.std != "") {
    //   STD = this.std;
    // }

    // if (this.partiFilterObj.schoolName != "") {
    //   SCHOOL = this.partiFilterObj.schoolName;
    // } else if (this.schoolName != "") {
    //   SCHOOL = this.schoolName;
    // }

    if (this.isStatus != "DELETE") {
      this.batchId = this.batchId;
    } else {
      this.batchId = null;
    }

    if (this.slot != "") {
      this.isAllocationStatus = true;
    } else {
      this.isAllocationStatus = null;
    }
    if (this.schedule != "") {
      this.isAllocationStatus = true;
    } else {
      this.isAllocationStatus = null;
    }

    console.log(this.emailId);
    if (this.oldEmailId != this.emailId) {
      this.email01PMAAcceptanceStatus = null;
      this.email02PMAAcceptanceStatus = null;
    }

    var STD = "";
    if (this.std) {
      STD = this.std;
    } else if (this.isSTD) {
      STD = this.isSTD;
    }
    // console.log(STD,"hahahhahahahsh",this.isSTD);
    var SCHOOl = "";
    if (this.schoolName) {
      SCHOOl = this.schoolName;
    } else if (this.isSchoolName) {
      SCHOOl = this.isSchoolName;
    }
    // console.log(SCHOOl,"hahahhahahahsh",this.isSchoolName);
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.validEmail = emailRegex.test(this.emailId);
    var mobRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    this.validMobile = mobRegex.test(this.contactNo);
    this.formSubmit = true;
    // this.slot &&
    // this.schedule
    console.log(this.participantName, this.validEmail, this.validMobile, this.isSchoolName, STD);

    if (
      this.participantName != "" &&
      this.validEmail &&
      this.validMobile &&
      SCHOOl && STD
    ) {
      console.log("inside if");
      let sendData = {
        id: this.id,
        userName: this.getUserData,
        name: this.participantName,
        contactNo: this.contactNo,
        emailid: this.emailId,
        std: STD,
        div: "",
        schoolName: SCHOOl,
        branch: this.branchName,
        // confirmStatus: this.confirmStatus == true ? 1 : 0,
        // "eventName": this.eventName,
        email01AttemptedDate: "",
        cleanRNo: this.cleanRNo,
        cleanOriginalEmail: this.cleanOriginalEmail,
        cleanUpdateComments: this.cleanUpdateComments,
        email01PMAAcceptanceStatus: this.email01PMAAcceptanceStatus,
        email01PMADeliveryStatus: this.email01PMADeliveryStatus,
        email02PMAAcceptanceStatus: this.email02PMAAcceptanceStatus,
        email02PMADeliveryStatus: this.email02PMADeliveryStatus,
        email02Reconfirmation: this.email02Reconfirmation,
        batchMasterId: this.batchId,
        allocationStatus: this.isAllocationStatus,

        // "slotStartTime": null,
        status: this.isStatus,
        // "slotEndTime": null,
        // "reportTime": null,
        // "date": null,
        // "totalParticipants": null,
        // "eventGroupCode": null
      };
      this.mainLoaderIs = true;
      this.http.getEdittedData(sendData).subscribe((data: any) => {
        if (data.success) {
          if (type == "emailUpdate") {
            let sendData = {
              participantId: this.id,
            };
            this.http.sendSingleEmail03(sendData).subscribe((data: any) => { });
          }
          this.getParticipantsList("", "", "");

          this.get_filter_list();
          this.toastr.success("Updated successfully");
          this.formSubmit = false;
          this.modalReference.close();
        } else {
          this.toastr.warning("Something went wrong!");
        }
        this.mainLoaderIs = false;
      });
    }
  }

  getNewAddedData() {
    if (this.slot != "") {
      this.isAllocationStatus = true;
    } else {
      this.isAllocationStatus = null;
    }
    if (this.schedule != "") {
      this.isAllocationStatus = true;
    } else {
      this.isAllocationStatus = null;
    }

    if (this.std) {
      var STD = this.std;
    } else {
      STD = this.isSTD;
    }
    console.log(this.schoolName);
    if (this.schoolName) {
      var SCHOOL = this.schoolName;
      console.log(SCHOOL);
    } else {
      SCHOOL = this.isSchoolName;
    }
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.validEmail = emailRegex.test(this.emailId);
    var mobRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    this.validMobile = mobRegex.test(this.contactNo);
    // this.isSchoolName &&
    // this.isSTD
    this.formSubmit = true;
    if (
      this.participantName &&
      this.contactNo &&
      this.validEmail &&
      this.validMobile
    ) {
      this.mainLoaderIs = true;
      let sendData = {
        userName: this.getUserData,
        name: this.participantName,
        contactNo: this.contactNo,
        emailid: this.emailId,
        std: STD,
        div: "",
        schoolName: SCHOOL,
        branch: this.branchName,
        // confirmStatus: this.confirmStatus == true ? 1 : 0,
        // "eventName": this.eventName,
        email01AttemptedDate: "",
        cleanRNo: this.cleanRNo,
        cleanOriginalEmail: this.cleanOriginalEmail,
        cleanUpdateComments: this.cleanUpdateComments,
        email01PMAAcceptanceStatus: "",
        email01PMADeliveryStatus: "",
        batchMasterId: this.batchId,
        allocationStatus: this.isAllocationStatus,
        status: this.isStatus,
        // "slotStartTime": null,
        // "slotEndTime": null,
        // "reportTime": null,
        // "date": null,
        // "totalParticipants": null,
        // "eventGroupCode": null
      };

      this.http.getAddedData(sendData).subscribe((data: any) => {
        if (data.success) {
          this.getParticipantsList("", "", "");
          this.get_filter_list();
          this.toastr.success("Added participant data successfully");

          this.formSubmit = false;
          this.modalReference.close();
        } else {
          this.toastr.warning("Something went wrong!");
        }
        this.mainLoaderIs = false;
      });
    }
  }

  DownloadParticipantsData() {
    this.http.DownloadParticipantsData().subscribe((result: any) => {
      var fileUrl = this.http.rootURL + "/" + result.fileName;
      console.log(fileUrl);
      window.open(fileUrl);
    });
  }

  getSlotEventDateList() {
    var STD = "";
    if (this.std) {
      STD = this.std;
    } else if (this.isSTD) {
      STD = this.isSTD;
    }
    var sendData = {
      standard: STD ? STD : this.partiFilterObj.std,
      eventDate: this.schedule ? this.schedule : null,
    };
    this.mainLoaderIs = true;
    this.http.getBatchEventDateList(sendData).subscribe((data: any) => {
      if (data.success) {
        this.eventDate = data.EventDates;
        this.eventStartTime = data.EventStartTime;

        // this.batchId = this.schedule;
      } else {
        this.toastr.warning("Something went wrong!");
      }
      this.mainLoaderIs = false;
    });
  }

  getSlotEventDateFilter() {
    var STD = "";
    if (this.std) {
      STD = this.std;
    } else if (this.isSTD) {
      STD = this.isSTD;
    }
    var sendData = {
      standard: STD ? STD : this.partiFilterObj.std,
      eventDate: this.partiFilterObj.slotFilter
        ? this.partiFilterObj.slotFilter
        : null,
    };
    this.mainLoaderIs = true;
    this.http.getBatchEventDateList(sendData).subscribe((data: any) => {
      if (data.success) {
        this.eventDate = data.EventDates;
        this.eventStartTime = data.EventStartTime;
        // this.batchId = this.schedule;
      } else {
        this.toastr.warning("Something went wrong!");
      }
      this.mainLoaderIs = false;
    });
  }

  public getSelectedBatch(event): void {
    // event will give you full breif of action
    this.batchId = event.target.value;
    console.log(this.batchId);
  }
  openShortModal() {
    this.isSendBulk = true;
    this.showSendBulkModal = true;
  }
  sendBulkEmail() {
    this.mainLoaderIs = true;
    this.http.sendEmail02Bulk2021().subscribe((data: any) => {
      if (data) {
        this.toastr.success("Sent emails successfully");
        this.showSendBulkModal = false;
        this.isSendBulk = false;
      } else {
        this.toastr.warning("Something went wrong!");
      }
      this.mainLoaderIs = false;
    });
  }
  DownloadFilteredParticipantsData() {
    if (this.partiFilterObj.cnfStatus == "All") {
      this.confirmStatusEmail02 = "All";
    } else if (this.partiFilterObj.cnfStatus == "CONFIRMED") {
      this.confirmStatusEmail02 = true;
    } else {
      this.confirmStatusEmail02 = null;
    }
    if (this.partiFilterObj.allocationStatus == "true") {
      this.partiFilterObj.allocationStatus = true;
    } else if (this.partiFilterObj.allocationStatus == "null") {
      this.partiFilterObj.allocationStatus = null;
    }
    var sendData = {
      name: this.partiFilterObj.name,
      emailId: this.partiFilterObj.emailid,
      contactNo: this.partiFilterObj.contactNo,
      schoolName: this.partiFilterObj.schoolName,
      std: this.partiFilterObj.std,
      status: this.partiFilterObj.status,
      email02Reconfirmation: this.confirmStatusEmail02,
      phase: this.partiFilterObj.phase,
      eventDate: this.partiFilterObj.slotFilter
        ? this.partiFilterObj.slotFilter
        : "All",
      slot: this.partiFilterObj.scheduleFilter
        ? this.partiFilterObj.scheduleFilter
        : "All",
      allocationStatus: this.partiFilterObj.allocationStatus,
    };

    this.http
      .DownloadFilterParticipantsData(sendData)
      .subscribe((result: any) => {
        console.log(result.fileName);
        var fileUrl = this.http.rootURL + "/" + result.fileName;
        console.log(fileUrl);
        window.open(fileUrl);
      });
  }
}
