import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../../service/http.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-hall-tickets",
  templateUrl: "./hall-tickets.component.html",
  styleUrls: ["./hall-tickets.component.css"]
})
export class HallTicketsComponent implements OnInit {
  modalRef: any;
  ticketFilteringData: any;
  tempStoreBranchList: any;
  ticketFilterObj: any;
  hallTicketsList: any;
  blankHallTickets: any;
  pageOffset: any;
  hallTicketLoaderIs: boolean;
  monthNames: any;
  pageNumber: any;
  numberFunction: any;
  pagination: any;
  offsetCnt: any;
  total: any;
  currentPage: any;
  blankHallTicketPointerVal: any;
  eventsData: any;
  roomsNotAssigned: boolean;

  constructor(
    public http: HttpService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.eventsData = [];
    this.monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    this.hallTicketLoaderIs = true;
    this.ticketFilteringData = {
      school: [],
      branch: [],
      std: [],
      pagination: ""
    };
    this.tempStoreBranchList = [];
    this.ticketFilterObj = {
      schoolName: "all",
      branch: "all",
      std: "all",
      offset: "",
      max: 99
    };
    this.blankHallTickets = [1, 2, 3];
    this.pageOffset = {
      offset: 0,
      lessThanHundread: false
    };
    this.pageNumber = [];
    this.numberFunction = {
      offsets: []
    };
    this.pagination = 0;
    this.offsetCnt = 99;
    this.total = 1;
    this.currentPage = 0;
  }
  ngOnInit() {
    this.get_filter_list();
    this.reset_list("onLoad");
    this.getHallTicketIntrctn();
  }

  getHallTicketIntrctn() {
    this.http.getHallTicketInstructions().subscribe(result => {
      this.eventsData = result;
      this.blankHallTicketPointerVal = this.eventsData[0].event_name;
    });
  }

  reset_list(getParam: string) {
    this.hallTicketsList = [];
    this.hallTicketLoaderIs = true;
    if (getParam == "school") {
      this.ticketFilterObj.branch = "all";
    }
    let data = {
      schoolName: this.ticketFilterObj.schoolName,
      branch: this.ticketFilterObj.branch,
      std: this.ticketFilterObj.std
    };
    this.http.getUserCount(data).subscribe((data: any) => {
      if (data.success) {
        this.total = data.total;
        this.numberFunction.offsets = (data.total / 100).toString().split(".");
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
          this.pageOffset.lessThanHundread = true;
          this.pageNumber = [this.numberFunction.offsets[1]];
        } else {
          var temp = {
            value: "",
            offset: 0
          };
          this.pageNumber = [];
          for (let i = 0; i <= this.numberFunction.offsets[0]; i++) {
            temp = {
              value:
                i > 0
                  ? temp.offset + 100 + "-" + (temp.offset + 198)
                  : 1 + "-" + (temp.offset + 99),
              offset: i > 0 ? temp.offset + 99 : temp.offset
            };
            this.pageNumber.push(temp);
          }
          //to set last page no. accurately.
          let len = this.pageNumber.length - 1;
          this.pageNumber[len] = {
            value: this.pageNumber[len - 1].offset + 100 + "-" + this.total,
            offset: this.pageNumber[len - 1].offset + 99
          };
          this.pageOffset.lessThanHundread = false;
        }
        this.hallTicketLoaderIs = false;
        this.get_hallTicket_list("onLoad");
      } else {
        if (
          this.ticketFilterObj.schoolName === "all" &&
          this.ticketFilterObj.branch === "all" &&
          this.ticketFilterObj.std === "all"
        ) {
          this.roomsNotAssigned = true;
        } else {
          this.roomsNotAssigned = false;
        }
        this.toastr.error("No data found");
        this.hallTicketLoaderIs = false;
        this.total = 0;
      }
      this.getParticularSchoolBranch(data.branch);
    });
  }

  get_filter_list() {
    this.http.getFilterList().subscribe((result: any) => {
      this.ticketFilteringData = result;
      this.tempStoreBranchList = result.branch;
    });
  }

  getDayOfMonthSuffix(n) {
    if (n >= 11 && n <= 13) {
      return "th";
    }
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  get_hallTicket_list(task: string) {
    if (task === "onLoad") {
      this.pageOffset = {
        offset: 0
      };
      this.pagination = 0;
    } else if (task === "start") {
      if (this.pageOffset.offset - this.offsetCnt >= 0) {
        this.pageOffset = {
          offset: 0
        };
        this.pagination = 0;
      } else {
        this.toastr.info("Already at first page");
        return false;
      }
    } else if (task === "prev") {
      if (this.pageOffset.offset - this.offsetCnt >= 0) {
        this.pageOffset = {
          offset: this.pageOffset.offset - this.offsetCnt
        };
        this.pagination = this.pageOffset.offset;
      } else {
        this.toastr.warning("Reached first page");
        return false;
      }
    } else if (task === "pageNo") {
      this.pageOffset = {
        offset: this.pagination
      };
    } else if (task === "next") {
      if (parseInt(this.pageOffset.offset) + this.offsetCnt <= this.total) {
        this.pageOffset = {
          offset: parseInt(this.pageOffset.offset) + this.offsetCnt
        };
        this.pagination = this.pageOffset.offset;
      } else {
        this.toastr.warning("Reached last page");
        return false;
      }
    } else if (task === "end") {
      if (parseInt(this.pageOffset.offset) + this.offsetCnt <= this.total) {
        let len = this.pageNumber.length - 1;
        this.pageOffset = {
          offset: this.pageNumber[len].offset
        };
        this.pagination = this.pageOffset.offset;
      } else {
        this.toastr.info("Already at last page");
        return false;
      }
    }

    this.hallTicketLoaderIs = true;
    var ticket_filter_obj = {
      schoolName: this.ticketFilterObj.schoolName,
      branch: this.ticketFilterObj.branch,
      offset: this.pageOffset.offset,
      std: this.ticketFilterObj.std,
      max: 99
    };
    this.http.getHallTicketList(ticket_filter_obj).subscribe((data: any) => {
      if (data.success === true) {
        this.hallTicketsList = data;
        for (let i = 0; i < this.hallTicketsList.result.length; i++) {
          this.hallTicketsList.result[i].date = this.hallTicketsList.result[
            i
          ].date.split("-");
          var ordinalIndicator = this.getDayOfMonthSuffix(
            this.hallTicketsList.result[i].date[2]
          );
          this.hallTicketsList.result[i].ordinalIndicator = ordinalIndicator;
          this.hallTicketsList.result[i].date[1] = this.monthNames[
            parseInt(this.hallTicketsList.result[i].date[1]) - 1
          ];
        }
        this.hallTicketLoaderIs = false;

        var startVal = parseInt(this.pageOffset.offset) + 1;
        var endVal =
          parseInt(this.pageOffset.offset) + this.hallTicketsList.result.length;

        if (this.total > 99) {
          this.currentPage = startVal + " - " + endVal;
        } else {
          this.currentPage = startVal + " - " + this.total;
        }
      } else {
        this.hallTicketLoaderIs = false;
        this.toastr.error("No data found");
      }
    });
  }

  getParticularSchoolBranch(getBranchList: any) {
    if (
      this.ticketFilterObj.schoolName == "all" ||
      getBranchList == undefined
    ) {
      this.ticketFilteringData.branch = this.tempStoreBranchList;
    } else {
      this.ticketFilteringData.branch = getBranchList;
    }
  }

  infoMsgToaster() {
    this.toastr.info("Print Dialog is Open", "", {
      closeButton: false
    });
  }

  printedSuccessModalBox(modalId) {
    this.infoMsgToaster();
    setTimeout(() => {
      this.modalRef = this.modalService.open(modalId);
    }, 1500);
  }
}
