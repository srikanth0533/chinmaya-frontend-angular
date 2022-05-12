import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpService } from "../../service/http.service";

@Component({
  selector: "app-group-list",
  templateUrl: "./group-list.component.html",
  styleUrls: ["./group-list.component.css"]
})
export class GroupListComponent implements OnInit {
  modalRef: any;
  groupListObj: any;
  getResult: any;
  getTotalCountGrpList: any;
  accordionExpandIs: boolean;
  groupListLoaderIs: boolean;
  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    public http: HttpService
  ) {
    this.groupListObj = [];
    this.getResult = {
      result: [],
      success: false
    };
    this.getTotalCountGrpList = 0;
    this.accordionExpandIs = false;
    this.groupListLoaderIs = false;
  }

  ngOnInit() {
    this.get_group_list();
  }

  get_group_list() {
    this.groupListLoaderIs = true;
    this.http.getGroupList().subscribe(result => {
      this.getResult = result;
      if (this.getResult.success && this.getResult.result.length > 0) {
        this.getTotalCountGrpList = this.getResult.result.length;
        this.groupListObj = [];
        var resultData = this.getResult.result;
        var get_group_list = this.getResult.result
          .reduce(function(res, currentValue) {
            if (res.indexOf(currentValue.std) === -1) {
              res.push(currentValue.std);
            }
            return res;
          }, [])
          .map(function(std) {
            return {
              std: std,
              total_parti: 0,
              dataList: resultData
                .filter(function(_el) {
                  return _el.std === std;
                })
                .map(function(_el) {
                  return _el;
                })
            };
          });

        get_group_list.forEach(listObj => {
          listObj.dataList.forEach(getObj => {
            listObj.total_parti += getObj.totalParticipants;
          });
          this.groupListObj.push(listObj);
        });
        setTimeout(() => {
          document.getElementById("expandAllBtn").click();
          this.groupListLoaderIs = false;
        }, 1000);
      } else {
        this.toastr.error("No data found");
        this.groupListLoaderIs = false;
      }
    });
  }
}
