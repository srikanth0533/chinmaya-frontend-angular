import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../service/http.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject, merge } from "rxjs";

@Component({
  selector: "app-batch-dashboard",
  templateUrl: "./batch-dashboard.component.html",
  styleUrls: ["./batch-dashboard.component.css"],
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
export class BatchDashboardComponent implements OnInit {
  modalReference: NgbModalRef;
  modalReference2: any;
  mainLoaderIs: boolean;
  batchDashboardData: any;
  isSendBulk: boolean = false;
  showSendBulkModal: boolean = false;
  slotWiseData: any;
  std: any;
  eventDate: any;
  combineStd:any;
  constructor(
    private toastr: ToastrService,
    public http: HttpService,
    private modalService: NgbModal
  ) {
    this.mainLoaderIs = false;
  }
  ngOnInit() {
    this.mainLoaderIs = true;
    this.batchData();
  }

  batchData() {
    this.mainLoaderIs = true;
    this.http.getBatchDashboardData().subscribe((data: any) => {
      if (data.success) {
        this.batchDashboardData = data.result;
        this.batchDashboardData.forEach(batch => {
          // console.log(batch.std);
          if(batch.std == "Std 9"){
            batch.std = "Std 9 & Std 10";
          }else if(batch.std == "Std 10"){
            batch.std = "Std 9 & Std 10";
          }
// console.log(batch.std)
        });
      } else {
        this.toastr.warning("Something went wrong!");
      }
      this.mainLoaderIs = false;
    });
  }
  openLg2(longContent2) {
    this.modalReference2 = this.modalService.open(longContent2, { size: "lg" });
  }
  openLg(longContent, batchData) {
    this.modalReference = this.modalService.open(longContent, { size: "lg" });
    var sendData = {
      id: batchData.id,
      batch: batchData.batch,
    };

    this.mainLoaderIs = true;
    this.http.getSlotData(sendData).subscribe((data: any) => {
      if (data.success) {
        this.slotWiseData = data.data;
        if (this.slotWiseData.length != 0) {
          this.std = this.slotWiseData[0].std;
            // console.log(batch.std);
            if(this.slotWiseData[0].std == "Std 9"){
              this.std = "Std 9 & Std 10";
            }else if(this.slotWiseData[0].std == "Std 10"){
              this.std = "Std 9 & Std 10";
            }

         
          this.eventDate = this.slotWiseData[0].eventDate;
        }

        // console.log(data.data);
      } else {
        this.toastr.warning("Something went wrong!");
      }
      this.mainLoaderIs = false;
    });
  }
  openShortModal() {
    this.isSendBulk = true;
    this.showSendBulkModal = true;
  }
}
