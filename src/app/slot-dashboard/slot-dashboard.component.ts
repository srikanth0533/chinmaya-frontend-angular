import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../service/http.service";
import { NgbDate, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxPrintModule } from "ngx-print";
@Component({
  selector: "app-slot-dashboard",
  templateUrl: "./slot-dashboard.component.html",
  styleUrls: ["./slot-dashboard.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class SlotDashboardComponent implements OnInit {
  registerUser: any;
  slotTime: any;
  closeResult: string;
  mainLoaderIs: boolean;
  IsSlotDashbordempty = true;
  IsSlotDashBoardList = false;
  showInputBox = false;
  addUpdateSlotBtn = false;
  addSloteTime: any = [];
  dataListAvaialable = false;
  slotSetting = false;
  slotAllocated = false;
  registerSlotData: any = [];
  toggleButton = true;
  showdate: any;
  getCount: any;
  downloadSheet: any;
  assinedSucess = false;
  startAssign = true;
  studentstd: any;
  studentslot: any;
  studentdate: any;
  addslotIs = true;
  form: any;
  cRound: any = 'none';
  creatDataObj: any = {};
  offset: any = 0;
  totalCount: any;
  page = 1;
  pageSize: any = 10;
  round:any
  isAddButtonDisable: boolean = true;
  longContent: any;
  docId: any;
 
  constructor(
    private toastr: ToastrService,
    public http: HttpService,
    private modalService: NgbModal
  ) {
    this.mainLoaderIs = false;
  }
  
  ngOnInit() {
    this.getParcipantCount();
    this.getSlotTime();   
  }  

  batchAllotment(index) {
    this.registerUser[index].allotment =
      this.registerUser[index].slot * this.registerUser[index].capacity;
  }

  slotCapacityDtl(operator, index, keyname) {
    if (keyname == "capacity") {
      switch (operator) {
        case "+":
          this.registerUser[index].capacity =
            this.registerUser[index].capacity + 1;
          break;
        case "-":
          this.registerUser[index].capacity =
            this.registerUser[index].capacity - 1;
          break;
        default:
          break;
      }
    }

    if (keyname == "slot") {
      switch (operator) {
        case "+":
          this.registerUser[index].slot = this.registerUser[index].slot + 1;
          break;
        case "-":
          this.registerUser[index].slot = this.registerUser[index].slot - 1;
          break;
        default:
          break;
      }
    }

    if (this.registerUser[index].capacity < 0) {
      this.registerUser[index].capacity = 0;
    }

    if (this.registerUser[index].slot < 0) {
      this.registerUser[index].slot = 0;
    }

    this.batchAllotment(index);
  }

  openSm(content: any) {
    this.modalService.open(content, { size: "sm" });
  }
  getround(){
    console.log(this.cRound)
   // this.opensheet(c , id)
  }
  pageChanged(event): void {
    this.modalService.dismissAll();
    this.offset = (event - 1) * this.pageSize;
 this.opensheet(this.longContent, this.docId)

  }


  opensheet(longContent: any,id) {
    this.longContent = longContent;
    this.docId= id;
    this.modalService.open(longContent, { size: "lg" });
    var sendData = {
      id: id,
      "limit": this.pageSize,
      "offset": this.offset,

    };
    this.mainLoaderIs = true;
    this.http.getParticipantsWithSlotId(sendData).subscribe(
      (response: any) => {
        if (response) {
          this.mainLoaderIs = false;
          this.downloadSheet = response.Data;

          this.studentstd = this.downloadSheet[0].standard;
          this.studentslot = this.downloadSheet[0].slot;
          this.studentdate = this.downloadSheet[0].date;
          this.totalCount = response.totalCount; 

          this.slotAllocated = true;
          this.getParcipantCount();
        } else {
          this.toastr.warning(response.msg);
          this.mainLoaderIs = false;
        }
      },
      (error) => {
        this.mainLoaderIs = false;
        this.toastr.warning("Issue Found");
      }
    );
  }

  getParcipantCount() {
    this.mainLoaderIs = true;
    this.isAddButtonDisable = true;
    this.http.getParticipantStatusCount().subscribe((responce: any) => {
      if (responce) {
        this.registerUser = responce;
        this.dataListAvaialable = true;
        var previousAssigned = [];
        this.registerUser.forEach((element, i) => {
          element.slot = 0;
          element.capacity = 0;
          element.allotment = 0;
          element.addnewSlote = false;

          element.addnewSloteData = [];
          element.slots.forEach((element2, ii) => {
            element2.IsEdit = false;
            element2.time = null;
            if (element2.date) {
              var year = new Date(element2.date).getFullYear();
              var month = new Date(element2.date).getMonth() + 1;
              var day = new Date(element2.date).getDate();
              element2.date = new NgbDate(year, month, day);
            } else {
              element2.date = "";
            }
            element2.times = element2.start_time + " - " + element2.end_time;          
          });
          previousAssigned.push(element.eventParticipantStatuses.canAllocate);
          if(!element.eventParticipantStatuses.canAllocate){
            this.startAssign = false;
          }
        });
        // if (previousAssigned.indexOf(false) > -1) {
        //   this.startAssign = false;
        // }
      } else {
        this.toastr.warning("Something went wrong!");
        this.dataListAvaialable = false;
        this.mainLoaderIs = false;
      }
      this.mainLoaderIs = false;
    });
  }

  slotCapacity(index) {
    var sendData = {
      standard: this.registerUser[index].std,
      numberofslot: this.registerUser[index].slot,
      capacity: this.registerUser[index].capacity,
    };
    this.mainLoaderIs = true;

    this.http.slotCapacity(sendData).subscribe(
      (response: any) => {
        if (response) {
          this.mainLoaderIs = false;
          this.toastr.success("Slot Created successfully");
        } else {
          this.toastr.warning(response.msg);
          this.mainLoaderIs = false;
        }
      },
      (error) => {
        this.mainLoaderIs = false;
        this.toastr.warning("Issue Found");
      }
    );
  }

  getSlotTime() {
    this.mainLoaderIs = true;
    this.http.getAllSlotTiming().subscribe((responce: any) => {
      if (responce) {
        this.slotTime = responce;
        if (this.slotTime) {
          this.slotTime.forEach((element) => {
            element.IsCheck = false;
            
            
            var startTime = [];
            var endTime = [];
            if (element.start_time) {
              startTime = element.start_time.split(":");
            }
            if (element.end_time) {
              endTime = element.end_time.split(":");
            }
            if (startTime.length > 0 && endTime.length > 0) {
              element.timing =
                startTime[0] +
                ":" +
                startTime[1] +
                " - " +
                endTime[0] +
                ":" +
                endTime[1];       
            }

          });
        }
      } else {
        this.toastr.warning("Something went wrong!");
        this.mainLoaderIs = false;
      }
      this.mainLoaderIs = false;
    });
  }

  createSlotTiming(sendData) {
    // var sendData = {
    //   start_time: this.registerUser[index].std,
    //   end_time: this.registerUser[index].std
    // };
    this.mainLoaderIs = true;
    this.http.createSlotTiming(sendData).subscribe(      
      (response: any) => {
        if (response) {
          this.mainLoaderIs = false;
          this.toastr.success("Slot Time Added Successfully");
           this.addSloteTime = [];
          this.getSlotTime();
        } else {
          this.toastr.warning(response.msg);
          this.mainLoaderIs = false;
        }
      },
      (error) => {
        this.mainLoaderIs = false;
        this.toastr.warning("Issue Found");
      }     
    );    
  }

  deleteSlotTiming(sendData) {
    // var sendData = {
    //   id: this.slotTime[index].std,
    // };
    this.mainLoaderIs = true;

    this.http.deleteSlotTiming(sendData).subscribe(
      (response: any) => {
        if (response) {
          this.mainLoaderIs = false;
          this.toastr.success("Slot Time Deleted Successfully");
          this.getSlotTime();
        } else {
          this.toastr.warning(response.msg);
          this.mainLoaderIs = false;
        }
      },
      (error) => {
        this.mainLoaderIs = false;
        this.toastr.warning("Issue Found");
      }
    );
  }

  updateSlotTiming(sendData) {
    // var sendData = {
    //   id: this.slotTime[index].id,
    //   start_time: this.slotTime[index].start_time,
    //   end_time: this.slotTime[index].end_time
    // };
    this.mainLoaderIs = true;

    this.http.updateSlotTiming(sendData).subscribe(
      (response: any) => {
        if (response) {
          this.mainLoaderIs = false;
          this.toastr.success("Slot Time Updated successfully");
          this.getSlotTime();
        } else {
          this.toastr.warning(response.msg);
          this.mainLoaderIs = false;
        }
      },
      (error) => {
        this.mainLoaderIs = false;
        this.toastr.warning("Issue Found");
      }
    );
  }

  newSlotTiming() {    
    var newSLotTiming = {
      id: 0,
      start_time: null,
      end_time: null,
      IsCheck: false,
    };
    this.addUpdateSlotBtn = false;
    // this.addslotIs = true;
    this.addSloteTime.push(newSLotTiming);    
  }

  addSlotTiming() {
    var create = this.addSloteTime.filter((element) => element.id == 0);
    var creatData = [];   
    var validListIs = true; 
    if (create.length > 0) {
      creatData = create.map((element) => {
        if(element.start_time && element.end_time){   
          return({
            start_time: element.start_time,
            end_time: element.end_time,
          })     
        }else{
          validListIs = false;
          this.toastr.warning("Enter Slot Time");
          return false;
        }
      });
      if(validListIs){
        var slotim = this.createSlotTiming(creatData);
      }
    }
  }

  editSlotTimeing() {
    var update = this.slotTime.filter((element) => element.id != 0);
    var updateData = [];
    if (update.length > 0) {
      updateData = update.map((element) => ({
        id: element.id,
        start_time: element.start_time,
        end_time: element.end_time,
      }));
      this.updateSlotTiming(updateData);
    }
  }

  deleteSlot() {
    var delet = this.slotTime.filter(
      (element) => element.IsCheck == true
    );
    var deleteData = [];
    delet.forEach(element => {
      (deleteData.push(element.id) )
    });    
    if(deleteData.length > 0){
      this.deleteSlotTiming({id:deleteData});
    }else{
      this.toastr.warning("Select slot");
    }
  }

  refresh() {
    window.location.reload();
  }

  activeInput() {
    this.addUpdateSlotBtn = !this.addUpdateSlotBtn;
    this.showInputBox = !this.showInputBox;
      
    if(this.addslotIs){
      this.addslotIs = false; 
      this.addSloteTime = [];
    }else{
      this.addslotIs = true; 
    }
    // this.getParcipantCount();

  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
    this.toastr.success("Link Copied Successfully");
  }

  //add slote page
  addSingleSloteEdit(registeIndex, slotIndex) {
    
    
    this.registerUser[registeIndex].addnewSlote =
      !this.registerUser[registeIndex].addnewSlote;
    this.registerUser[registeIndex].slots.forEach((element, index) => {
      element.IsEdit = !element.IsEdit;
    });
    this.toggleButton = false;
  }

  deleteSingleSlot(id) {
    var sendData = {
      id: id,
    };
    this.mainLoaderIs = true;
    this.http.deleteSlot(sendData).subscribe(
      (response: any) => {
        if (response.success == true) {
          this.toastr.success("Slot Deleted successfully");
          this.mainLoaderIs = false;
          this.getParcipantCount();
        } else {
          this.toastr.warning(response.message);
          this.mainLoaderIs = false;
        }
      },
      (error) => {
        this.mainLoaderIs = false;
        this.toastr.warning("Issue Found");
      }
    );
  }

  updateBulkSlot(sendData) {
    // var sendData = {
    //   id: this.slotTime[index].id,
    //   start_time: this.slotTime[index].start_time,
    //   end_time: this.slotTime[index].end_time
    // };
    this.mainLoaderIs = true;
    this.http.updateBulkSlots(sendData).subscribe(
      (response: any) => {
        if (response) {
          this.mainLoaderIs = false;
          this.toastr.success("Slot Updated successfully");
          this.getParcipantCount();
        } else {
          this.toastr.warning(response.msg);
          this.mainLoaderIs = false;
        }
      },
      (error) => {
        this.mainLoaderIs = false;
        this.toastr.warning("Issue Found");
      }
    );
  }

  createSingleSlot(sendData) {
    // var sendData = {
    //   start_time: this.registerUser[index].std,
    //   end_time: this.registerUser[index].std
    // };
    this.mainLoaderIs = true;

    this.http.createSingleSlot(sendData).subscribe(
      (response: any) => {
        if (response.success) {
          this.mainLoaderIs = false;
          this.toastr.success("Slot Created successfully");
          this.getParcipantCount();
        } else {
          this.toastr.warning(response.message);
          this.mainLoaderIs = false;
          this.getParcipantCount();
        }
      },
      (error) => {
        this.mainLoaderIs = false;
        this.toastr.warning("Issue Found");
      }
    );
  }

  addNewSloteData(index) {
    this.isAddButtonDisable = false;
    var slotLength = this.registerUser[index].slots.length;
    var addSingleSlot = {
      slot: null,
      capacity: null,
      date: null,
      time: null,
      slotTimingId: null,
      standard: null,
      zoom_link: null,
    };
    this.registerUser[index].addnewSloteData.push(addSingleSlot);    
  }

  addSlotData(index) {
    var standrd = this.registerUser[index].std;
    var create = this.registerUser[index].addnewSloteData;
    var creatData = {};
    var createslot;
    var createcapacity;
    var createslotTimingId;
    var createstandard;
    var createdate;

    if (create.length > 0) {
       create.forEach(element => {
        // createslot= element.slot ? element.slot : this.toastr.warning("Enter Slot");
        // createcapacity= element.capacity ? element.capacity : this.toastr.warning("Enter Capacity");
        // createslotTimingId= element.time ? this.getIdByTime(element.time):this.toastr.warning("Select Time");
        // createstandard= standrd;
        // createdate= element.date ? this.inputFormateDate(element.date):null || element.date ? this.inputFormateDate(element.date):this.toastr.warning("Select Date");
        this.creatDataObj = {
          slot: element.slot ? element.slot : this.toastr.warning("Enter Slot"),
          capacity: element.capacity ? element.capacity : this.toastr.warning("Enter Capacity"),
          slotTimingId: element.time ? this.getIdByTime(element.time):this.toastr.warning("Select Time"),
          standard: standrd,
          date: element.date ? this.inputFormateDate(element.date):null || element.date ? this.inputFormateDate(element.date):this.toastr.warning("Select Date")
        }
      });

      console.log("jhsdjghsfjg",createslot,createcapacity,createslotTimingId,createstandard,createdate);
      
     
      console.log("creatData",creatData);
      console.log("creatData",this.creatDataObj);
      this.createSingleSlot(this.creatDataObj);
    }
  }
  
  updateSlotData(index) {
    var standrd = this.registerUser[index].std;
    var update = this.registerUser[index].slots;

    var updateData = [];
    if (update.length > 0) {
      updateData = update.map((element) => ({
        id: element.id,
        capacity: element.capacity,
        slotTimingId: element.slotTimingId ? element.slotTimingId :this.toastr.warning("Select Time"),
        date: element.date ? this.inputFormateDate(element.date): null || element.date ? this.inputFormateDate(element.date): this.toastr.warning("Select Date"),
        zoom_link: element.zoom_link,
      }));

      this.updateBulkSlot(updateData);
    }
  }

  getIdByTime(time) {
    var timeId = this.slotTime.filter((element) => element.timing == time);
    return timeId[0].id;
  }

  inputFormateDate(date) {
    var month = date.month > 10 ? date.month : "0" + date.month;
    var day = date.day > 10 ? date.day : "0" + date.day;
    return date.year + "-" + month + "-" + day;
  }

  ParticipantsWithSlot(id) {
    var sendData = {
      id: id,
    };
    this.mainLoaderIs = true;
    this.http.getParticipantsWithSlotId(sendData).subscribe(
      (response: any) => {
        if (response) {
          this.mainLoaderIs = false;
          this.downloadSheet = response;          
            this.studentstd = this.downloadSheet.participant.std;
            this.studentslot = this.downloadSheet.slot;
            this.studentdate = this.downloadSheet.date;
          
          this.slotAllocated = true;
          // this.toastr.success('Slot Updated successfully');
          this.getParcipantCount();
          // this.refresh();
        } else {
          this.toastr.warning(response.msg);
          this.toastr.warning('something is wrong');
          this.mainLoaderIs = false;
        }
      },
      (error) => {
        this.mainLoaderIs = false;
        this.toastr.warning("Issue Found");
      }
    );
  }

  assignParticipant(std) {
    var sendData;
    if (std != "") {
      sendData = {
        standard: std,
      };
    }
    this.mainLoaderIs = true;
    this.http.assignParticipant(sendData).subscribe(
      (response: any) => {
        if (response) {
          this.mainLoaderIs = false;
          // this.toastr.success('assigned successfully');
          // this.refresh();
          this.assinedSucess = true;
        
          this.getParcipantCount();
          this.startAssign = true;
        } else {
          this.toastr.warning(response.msg);
          this.mainLoaderIs = false;
          this.slotAllocated = false;
        }
      },
      (error) => {
        this.mainLoaderIs = false;
        this.toastr.warning("Issue Found");
      }
    );
  }

  unAssignParticipant() {
    this.toastr.warning("No Data to Assign");
  }

  slotSettingToggle() {
    this.slotSetting = !this.slotSetting;
    this.getParcipantCount();
  }
}
