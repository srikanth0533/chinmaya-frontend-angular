import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { HttpService } from "../service/http.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: 'app-maintenance-mode',
  templateUrl: './maintenance-mode.component.html',
  styleUrls: ['../registration-form/registration-form.component.css','./maintenance-mode.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MaintenanceModeComponent implements OnInit {
  maintenanceModeValue: boolean;
  mainLoaderIs: boolean = false;

  constructor(private router: Router,public http: HttpService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.maintenanceStatus();
    setInterval(() => {
      this.maintenanceStatus();
    }, 10000);
  }
  maintenanceStatus() {
    this.mainLoaderIs = true;
    this.http.getMaintenanceStatus().subscribe((response: any) => {
        if (response) {
          this.maintenanceModeValue = response[0].maintenance;
          if(this.maintenanceModeValue == false){
            this.router.navigate(["registrationForm"]);
          }
          console.log(response[0].maintenance);
        } else {
          this.toastr.error("Something went wrong!");
        }
        this.mainLoaderIs = false;
      });
  }
}
