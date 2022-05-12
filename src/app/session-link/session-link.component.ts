import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../service/http.service";
import { Observable, Subject, merge } from "rxjs";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Router, ActivatedRoute } from "@angular/router";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as moment from "moment";
@Component({
  selector: "app-session-link",
  templateUrl: "./session-link.component.html",
  styleUrls: ["./session-link.component.css"],
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
export class SessionLinkComponent implements OnInit {
  isAppealPage: boolean = true;
  isRulesRegulation: boolean = false;
  proceedSlotDetails: boolean = true;
  onBoarding: boolean = false;
  inSession: boolean = false;
  preJoined: boolean = false;
  Agreecheckbox: boolean = false;
  sessionClosed: boolean = false;
  mainLoaderIs: boolean = false;
  modalReference: NgbModalRef;
  refCode: any;
  eventSlotData: any;
  eventDate: any;
  dateMonth: any;
  dateDay: any;
  day: any;
  month: any;
  monthDayConcat: any;
  year: any;
  timer: any = "";
  countDownDateTime: any = "";
  countDownDay: any;
  hrsConvert24Format: any;
  separateMins: any;
  startTime: any;
  difference: any;
  isSendBulk: boolean = false;
  showSendBulkModal: boolean = false;
  wrongSession: boolean = false;
  eventOnBoardingTime: any;
  
  eventStartTime: any;
  globEventOnBoardingTime: any;
  globEventOnBoardingTimeForView: any;
  eventOnEndTime:any
  globEventOnEndTime :any
globEventOnEndTimeForView :any
globEventOnEndTimeAmPm :any
  globEventBordTimeAmPm: any;
  globEventStartTime: any;
  globEventStartTimeForView: any;
  globEvntTimeAmPm: any;
  sessionStartTime: any;
  sessionBoardingTime: any;
  amPm: any;
  timerCountDays : any;
timerCountHours : any;
timerCountMinutes : any;
timerCountSeconds : any;
isChecked: boolean = false;
eventEndTime:any
sessionEndTime:any
  amPmStart: string;

  constructor(
    private toastr: ToastrService,
    public http: HttpService,
    private modalService: NgbModal,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.appealCalled();
   
  }
  appealCalled() {
    this.isRulesRegulation = true;
    this.isAppealPage = false;
    this.proceedSlotDetails = false;
    this.startTime = Date.now();
  }
 slotDetailsCalled() {
   setTimeout(() => {
      this.getTokenMeetingLink();
    }, 100);
    // this.getDismissReason();
    this.isRulesRegulation = false;
    this.proceedSlotDetails = true;
    this.preJoined = true;
   
  }

  openShortModal() {
    this.isSendBulk = true;
    this.showSendBulkModal = true;
  }
  getDismissReason() {
    if (this.startTime) {
      var endTime = Date.now();
      this.difference = endTime - this.startTime;
      this.startTime = null;
      console.log(this.difference);
      this.getLinkStatus();
    }
  }
  openLg(longContent) {
    if (this.preJoined) {
      this.inSession = false;
      this.preJoined = true;
      this.onBoarding = false;
    } else if (this.onBoarding) {
      this.startTime = Date.now();
      this.inSession = false;
      this.preJoined = false;
      this.onBoarding = true;
    } else {
      this.startTime = Date.now();
      this.inSession = true;
      this.preJoined = false;
      this.onBoarding = false;
    }

    this.modalService.open(longContent, { size: "lg" }).result.then(
      (result) => {},
      (reason) => {
        // this.getDismissReason();
      }
    );
  }

  // TAKE TO ZOOM LINK WINDOW
  openZoomLink() {
    window.open(this.eventSlotData.zoom_link, "_blank");
  }

  // MANIPULATING MINUTES AND SECONDS TO TRACK AND CHANGE PAGES AS PER TIME
  onLoadActivePage() {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var totalMinutesForCurrTime = hours * 60 + minutes;

    /* var eventHoursBrd = moment(utcBrdDateNdTime).format("HH"),
      eventMinsBrd = moment(utcBrdDateNdTime).format("mm"); */


    //Boarding time
    var [eventHoursBrd, eventMinsBrd] = this.globEventOnBoardingTime.split(":");

    console.log("JJeventHoursBrd", eventHoursBrd, eventMinsBrd);
    var totalMinutesForEvntBrdTime =
      parseInt(eventHoursBrd) * 60 + parseFloat(eventMinsBrd);

    console.log("totalMinutesForEvntBrdTime", totalMinutesForEvntBrdTime);

    //end time
    var [eventEndHoursBrd, eventEndMinsBrd] = this.globEventOnEndTime.split(":");

    console.log("JJeventHoursBrd", eventEndHoursBrd, eventEndMinsBrd);
    var totalMinutesForEvntBrdEndTime =
      parseInt(eventEndHoursBrd) * 60 + parseFloat(eventEndMinsBrd);

    console.log("totalMinutesForEvntBrdEndTime", totalMinutesForEvntBrdEndTime
    );


    /* var strtHoursStr = moment(utcEvntDateNdTime).format("HH"),
      strtMinsStr = moment(utcEvntDateNdTime).format("mm"); */

   //start time
    var [strtHoursStr, strtMinsStr] = this.globEventStartTime.split(":");
    console.log("strtHoursStr", strtHoursStr, strtMinsStr);

    var totalMinutesForEvntStrTime =
      parseInt(strtHoursStr) * 60 + parseFloat(strtMinsStr);

      console.log("totalMinutesForEvntStrTime", totalMinutesForEvntStrTime);



    var formattedCurrentDate = moment().format("YYYY-MM-DD");
    if (formattedCurrentDate == this.eventDate) {
      if (totalMinutesForCurrTime >= totalMinutesForEvntBrdTime) {
        /* if (
          totalMinutesForCurrTime >= totalMinutesForEvntBrdTime 
          // totalMinutesForCurrTime < 1260  totalMinutesForEvntBrdEndTime
        ) { */
          if (totalMinutesForCurrTime >= totalMinutesForEvntStrTime) {
            
            if (totalMinutesForCurrTime >= totalMinutesForEvntBrdEndTime) {
              this.inSession = false;
              this.onBoarding = false;
              this.preJoined = false;
              this.sessionClosed = true;
              //this.toastr.success("Session Started");
            } else {
              this.inSession = true;
              this.onBoarding = false;
              this.preJoined = false;
              this.sessionClosed = false;
            //this.toastr.success("Session Started");
            }
          } 
          else {
            this.inSession = false;
            this.onBoarding = true;
            this.preJoined = false;
            this.sessionClosed = false;
          }
       /*  } else {
          this.inSession = false;
          this.onBoarding = false;
          this.preJoined = false;
          this.sessionClosed = true;
        } */
      } else {
        this.inSession = false;
        this.onBoarding = false;
        this.preJoined = true;
        this.sessionClosed = false;
      }
    }

  }

  // TO CALL REPEATEADLY FOR CHANGING PAGE STATUS
  intervalFun() {
    setInterval(() => {
      this.onLoadActivePage();
    }, 1000);
  }

  // GET ZOOM MEETING LINK AND PERSON DATA
  getTokenMeetingLink() {
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
        // email03Confirmation: true,
        // isDownloadConfirmation: null,
      };
      this.http.getTokenMeeting(sendData).subscribe((data: any) => {
        if (data) {
          this.mainLoaderIs = false;
          this.eventSlotData = data;
           if(this.eventStartTime == null && this.eventDate == null){
            this.mainLoaderIs = false;
           }
          this.eventStartTime = this.eventSlotData.slot_timing.start_time;
          // this.eventStartTime = "16:25:00";
          var splitEventStartTime = this.eventStartTime.split(':')
          var splitEventStartTimeHour = splitEventStartTime[0];
          var splitEventStartTimeMin = splitEventStartTime[1];
          this.sessionStartTime = splitEventStartTimeHour + ':' + splitEventStartTimeMin;

          this.eventEndTime = this.eventSlotData.slot_timing.end_time;
          var splitEventEndTime = this.eventEndTime.split(':')
          var splitEventEndTimeHour = splitEventEndTime[0];
          var splitEventEndTimeMin = splitEventEndTime[1];
          this.sessionEndTime = splitEventEndTimeHour + ':' + splitEventEndTimeMin;
          this.eventDate = this.eventSlotData.date;
          
          var getDateSplit = this.eventSlotData.date.split("T");
              var getFullDate = getDateSplit[0];
          // this.eventDate = "2021-07-07";
          var splitdate = getFullDate.split("-");
          var splitday = splitdate[2];
          var splitmonth = splitdate[1];
          this.year = splitdate[0];
          this.countDownDay = splitday;
          this.eventDate = splitmonth + '-' + splitday + '-' + this.year;
      //month-day-year
        
          var dt = new Date("December 31, 2021" +" "+ this.eventStartTime);
          dt.setMinutes( dt.getMinutes() - 15 );
          this.eventOnBoardingTime=dt.toLocaleTimeString('it-IT');

          var dt = new Date("December 31, 2021" +" "+ this.eventEndTime);
          dt.setMinutes( dt.getMinutes() );
          this.eventOnEndTime=dt.toLocaleTimeString('it-IT');


          var splitEventBoardingTime = this.eventOnBoardingTime.split(':')
          var splitEventBoardingTimeHour = splitEventBoardingTime[0];
          var splitEventBoardingTimeMin = splitEventBoardingTime[1];
          this.sessionBoardingTime = splitEventBoardingTimeHour + ':' + splitEventBoardingTimeMin;
          // this.eventDate = this.eventSlotData.date;
          if(splitEventBoardingTimeHour > 12 || splitEventBoardingTimeHour == 12){
          console.log("i am PM")
            this.amPmStart = "PM";
          }else{
            this.amPmStart = 'AM';
          }
          if(splitEventStartTimeHour > 12 || splitEventStartTimeHour == 12){
            this.amPm = "PM";
          }else{
            this.amPm = 'AM';
          }

          var splitEventEndTime = this.eventOnEndTime.split(':')
          var splitEventEndTimeHour = splitEventEndTime[0];
          var splitEventEndTimeMin = splitEventEndTime[1];
          this.sessionEndTime = splitEventEndTimeHour + ':' + splitEventEndTimeMin;
          // this.eventDate = this.eventSlotData.date;
          if(splitEventBoardingTimeHour > 12 || splitEventBoardingTimeHour == 12){
          console.log("i am PM")
            this.amPmStart = "PM";
          }else{
            this.amPmStart = 'AM';
          }
          if(splitEventEndTimeHour > 12 || splitEventEndTimeMin == 12){
            this.amPm = "PM";
          }else{
            this.amPm = 'AM';
          }


          console.log(splitEventBoardingTimeHour, splitEventStartTimeHour,splitEventBoardingTimeHour >= 12, splitEventStartTimeHour >= 12);

          var dateNdTimeStringForEdt = new Date(this.eventDate + " " + this.eventOnBoardingTime);
          var dateNdTimeStringForEnd = new Date(this.eventDate + " " + this.eventOnEndTime);
 
          var dateNdTimeStringWithEvntSatrtTimeForEdt = new Date(this.eventDate + " " + this.eventStartTime);
console.log(dateNdTimeStringForEdt,
  dateNdTimeStringWithEvntSatrtTimeForEdt,"-----------------------")
          const utcDateNdTimeForTimer = moment.utc(dateNdTimeStringForEdt).local();
          const utcDateNdTimeForTimerEnd = moment.utc(dateNdTimeStringForEnd).local();
          const utcDateNdTimeEvntTime = moment.utc(dateNdTimeStringWithEvntSatrtTimeForEdt).local();

          this.globEventOnBoardingTime = moment(utcDateNdTimeForTimer).format("HH:mm");
          this.globEventOnBoardingTimeForView = moment(utcDateNdTimeForTimer).format("hh:mm");
          this.globEventBordTimeAmPm = moment(utcDateNdTimeForTimer).format("A");

          this.globEventOnEndTime = moment(utcDateNdTimeForTimerEnd).format("HH:mm");
          this.globEventOnEndTimeForView = moment(utcDateNdTimeForTimerEnd).format("hh:mm");
          this.globEventOnEndTimeAmPm = moment(utcDateNdTimeForTimerEnd).format("A");

          this.globEventStartTime = moment(utcDateNdTimeEvntTime).format("HH:mm");
          this.globEventStartTimeForView = moment(utcDateNdTimeEvntTime).format("hh:mm");
          this.globEvntTimeAmPm = moment(utcDateNdTimeEvntTime).format("A");
          this.eventDate = moment(utcDateNdTimeForTimer).format("YYYY-MM-DD");



          if (splitday == 19 || 20 || 4 || 5 || 6 || 7 || 8 || 9 || 10 || 11 || 12 || 13 || 14 || 15 || 16 ||17||18 || 24||25||26||27||28||29||30) {
            this.day = splitday + "th";
          } else if (splitday == 22 || 2) {
            this.day = splitday + "nd";
          } else if (splitday == 3 || 23) {
            this.day = splitday + "rd";
          } else if (splitday == 21 || 1 || 31) {
            this.day = splitday + "st";
          }

          if (splitmonth == 12) {
            this.month = "Dec";
          } else if(splitmonth == 1) {
            this.month = "Jan";
          }else if(splitmonth == 2) {
            this.month = "Feb";
          }else if(splitmonth == 3) {
            this.month = "Mar";
          }else if(splitmonth == 4) {
            this.month = "Apr";
          }else if(splitmonth == 5) {
            this.month = "May";
          }else if(splitmonth == 6) {
            this.month = "Jun";
          }else if(splitmonth == 7) {
            this.month = "Jul";
          }else if(splitmonth == 8) {
            this.month = "Aug";
          }else if(splitmonth == 9) {
            this.month = "Sep";
          }else if(splitmonth == 10) {
            this.month = "Oct";
          }else if(splitmonth == 11) {
            this.month = "Nov";
          }

          this.monthDayConcat = this.day + ' ' + this.month;
       
          console.log(this.countDownDateTime);
          var abc = new Date().getUTCHours() + 1;


          this.onLoadActivePage();
          this.intervalFun();
          this.changeStatus();
        } else {
          // this.wrongSession = true;
          this.mainLoaderIs = false;
          this.toastr.warning("Something went wrong!");
        }
        this.mainLoaderIs = false;
      });
    }
  }

  // API FOR TRACKING HOW MANY SECONDS PERSON STAYED
  getLinkStatus() {
    this.mainLoaderIs = true;
    var sendData = {
      token: this.refCode,
      timeDuration: this.difference,
    };
    this.http.getStatusLink(sendData).subscribe((data: any) => {
      if (data.success) {
      } else {
        this.toastr.warning("Something went wrong!");
      }
      this.mainLoaderIs = false;
    });
  }

  // TO SHOW TIMER
  changeStatus() {
    var [
      eventHoursBrd,
      eventMinsBrd,
    ] = this.eventOnBoardingTime.split(":");
    // if (eventHoursBrd === "12") {
    //   eventHoursBrd = "00";
    // }
    var hrsConvert24Format = parseInt(eventHoursBrd, 10) + 12;
    console.log(
      this.month,
      this.countDownDay,
      this.year,
      this.eventOnBoardingTime,
      // eventMinsBrd
    );
    this.countDownDateTime =
      this.month +
      " " +
      this.countDownDay +
      ", " +
      this.year +
      " " +
      this.eventOnBoardingTime 
      // hrsConvert24Format.toString() +
      // ":" +
      // eventMinsBrd +
      // ":00"
      ;
    console.log("this.countDownDateTime", this.countDownDateTime);
    var countDownDate = new Date(this.countDownDateTime).getTime();
    // console.log(countDownDate);
    var x = setInterval(() => {
      var now = new Date().getTime();
      console.log(now, "now");
      var distance = countDownDate - now;
      console.log(distance);
      this.timerCountDays = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.timerCountHours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.timerCountMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.timerCountSeconds = Math.floor((distance % (1000 * 60)) / 1000);

      // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      // + minutes + "m " + seconds + "s ";
      // this.timer = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      // console.log(this.timer);
      // console.log(days);
      // console.log(hours);
      // console.log(minutes);
      // console.log(seconds);
      if (distance <= -1) {
        clearInterval(x);
        // this.toastr.success("Onboarding Started");
      }
    }, 1000);
  }

  // DOWNLOAD APPEAL
  downloadPDFAppeal() {
    console.log(this.eventSlotData.appealFilePath);
    var fileUrl = this.http.rootURL + "/" + this.eventSlotData.appealFilePath;
    console.log(fileUrl);
    window.open(fileUrl);
  }
  openrRule(model){
    this.modalService.open(model, { size: 'lg' });
   
  }
}
