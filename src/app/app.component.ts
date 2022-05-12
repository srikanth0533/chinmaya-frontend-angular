import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from './service/http.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "event-management";
  scrolled = false;
  mainLoaderIs: boolean;
  isLogoutButtonShow: boolean = false;
  isHeader: boolean = false;
  counting: number = 1;
  myInterval: any;
  // sessionTimerSec: number = 1 * 60;
  sessionTimerSec: number = 45 * 60;
  loggedUserObject:any;
  
  constructor(private router: Router,public http: HttpService,private toastr: ToastrService) {
    router.events.subscribe((val: any) => {
      if (val.url) {
        var currentUrl = val.url.replace("/", "");
        if (currentUrl == "login") {
          this.isLogoutButtonShow = false;
        } else {
          this.isLogoutButtonShow = true;
        }

        if (val.url.indexOf("/mobileVerification") > -1) {
          this.isHeader = true;
          // console.log(currentUrl);
        } else if (val.url.indexOf("/sessionLink") > -1) {
          this.isHeader = true;
          // console.log(currentUrl);
        } else if (val.url.indexOf("/participantCertificate") > -1) {
          this.isHeader = true;
          // console.log(currentUrl);
        } else if (val.url.indexOf("/winnerLink") > -1) {
          this.isHeader = true;
          // console.log(currentUrl);
        } else if (val.url.indexOf("/winnerCertificate") > -1) {
          this.isHeader = true;
          // console.log(currentUrl);
        } else if (val.url.indexOf("/unSubscribe") > -1) {
          this.isHeader = true;
          // console.log(currentUrl);
        } else if (val.url.indexOf("/websiteStats") > -1) {
          this.isHeader = true;
          // console.log(currentUrl);
        } else if (val.url.indexOf("/registrationForm") > -1) {
          this.isHeader = true;
          // console.log(currentUrl);
        } else if (val.url.indexOf("/paymentLink") > -1) {
          this.isHeader = true;
          // console.log(currentUrl);
        } else if (val.url.indexOf("/registrationClose") > -1) {
          this.isHeader = true;
          // console.log(currentUrl);
        } else if (val.url.indexOf("/unsubscribePage") > -1) {
          this.isHeader = true;
          console.log(currentUrl);
        } else if (val.url.indexOf("/finalSession") > -1) {
          this.isHeader = true;
          // console.log(currentUrl);
        } else {
          this.isHeader = false;
          // console.log(currentUrl);
        }
      }
    });
  }
  ngOnInit() {
    let ele = document.getElementById("mainSection");
    ele.addEventListener("scroll", () => this.scrollHandler(ele), true);


    this.loggedUserObject = JSON.parse(
      sessionStorage.getItem('userData')
    );
    if (this.loggedUserObject) {
      this.tokenRefreshSilently();
    }
  }

  timerHandler() {
    this.counting++;
    if (this.counting >= this.sessionTimerSec) {
      this.stopTimer();
      this.tokenRefreshSilently();
    }
    // console.log("this.counting", this.counting);
    // sessionStorage.setItem("getLastTimerCount", JSON.stringify(this.counting));
  }
  startTimer() {
    this.myInterval = setInterval(() => {
      this.timerHandler();
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.myInterval);
    this.counting = 0;
  }
  tokenRefreshSilently() {
    var loggedUserObjForTkn = JSON.parse(
      sessionStorage.getItem('userData')
    );
    if (loggedUserObjForTkn) {
      var sendHeadObj = {
        id:loggedUserObjForTkn.user.id,
        refresh_token: loggedUserObjForTkn.refresh_token,
      };
      this.http.silentlyTokenRefreshReq(sendHeadObj).subscribe(
        (response: any) => {
          if (response.success) {
            loggedUserObjForTkn.token = response.new_token;
            sessionStorage.setItem(
              'userData',
              JSON.stringify(loggedUserObjForTkn)
            );
            this.startTimer();
          } else {
            // this.toastr.error("Your session is expired kindly login again");
            this.logout();
          }
        },
        (error) => {
          this.errorHandler(error);
        }
      );
    } else {
      this.logout();
    }
  }
  errorHandler(errorObj) {
    var errorMsg = 'Error: ' + errorObj.error;
    if (errorObj.error == 'Unauthorized') {
      errorMsg = 'Your session is expired kindly login again';
      this.logout();
    }
  }
  scrollHandler(ele: HTMLElement) {
    if (ele.scrollTop > 350) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }
  scrollTop() {
    document.getElementById("mainSection").scrollTo(0, 0);
  }
  logout() {
    this.mainLoaderIs = true;
    this.http.logout().subscribe((data: any) => {
        if (data) {
    setTimeout(() => {
      this.stopTimer();
      sessionStorage.clear();
      this.router.navigate(["login"]);
      this.mainLoaderIs = false;
      this.toastr.success(data.message);
    }, 100);
  }else{
    this.mainLoaderIs = false;
    this.toastr.warning("Something went wrong!");
  }
  });
}
}
