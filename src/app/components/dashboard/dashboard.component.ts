import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HttpService } from "../../service/http.service";
import { FileHandle } from "../../service/drag-drop.directive";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  fileObj: any;
  files: FileHandle[] = [];
  dragAndDropElmnt: any;
  mainLoaderIs: boolean;
  getFileInput: any;
  onloadShownSection: number;
  partiSection: any;
  groupSection: any;
  constructor(
    private toastr: ToastrService,
    public http: HttpService,
    private router: Router
  ) {
    this.mainLoaderIs = false;
    this.onloadShownSection = 0;
    this.partiSection = {
      fileSelectedIs: false,
      fileObj: {
        name: ""
      }
    };
    this.groupSection = {
      fileSelectedIs: false,
      fileObj: {
        name: ""
      }
    };
  }

  ngOnInit() {
    setTimeout(() => {
      document.addEventListener("dragover", function(e) {
        e.preventDefault();
        e.stopPropagation();
      });
      document.addEventListener("drop", function(e) {
        e.preventDefault();
        e.stopPropagation();
      });
    }, 1000);
    this.checkPartiAndGroupFileUploaded();
  }

  filesDropped(files: FileHandle[], selectedId): void {
    this.files = files;
    var selId = "#" + selectedId;
    var fileElement = document.querySelector(selId);
    this.checkSelectedFile(fileElement, this.files[0].file);
  }

  checkSelectedFile(getElement, gettingFile) {
    this.getFileInput = getElement;
    var filePath = "";
    if (
      gettingFile != undefined &&
      gettingFile != null &&
      gettingFile != "undefined"
    ) {
      filePath = gettingFile.name;
    } else {
      filePath = this.getFileInput.value;
      gettingFile = getElement.files[0];
    }
    const allowedExtensions = /(\.xlsx)$/i;
    if (!allowedExtensions.exec(filePath)) {
      this.toastr.warning("Please upload file having extensions .xlsx only.");
      this.getFileInput.value = "";
      this.dragAndDropElmnt.style.borderColor = "#f00";
    } else {
      this.dragAndDropElmnt.style.borderColor = "#1f8223";

      if (this.onloadShownSection == 1) {
        this.partiSection.fileObj = gettingFile;
        this.partiSection.fileSelectedIs = true;
      }
      if (this.onloadShownSection == 2) {
        this.groupSection.fileObj = gettingFile;
        this.groupSection.fileSelectedIs = true;
      }
    }
  }

  cancelSelectedFile() {
    this.getFileInput.value = "";
    this.dragAndDropElmnt.style.borderColor = "#d2d2d2";
    if (this.onloadShownSection == 1) {
      this.partiSection.fileObj = {};
      this.partiSection.fileSelectedIs = false;
    }
    if (this.onloadShownSection == 2) {
      this.groupSection.fileObj = {};
      this.groupSection.fileSelectedIs = false;
    }
    this.mainLoaderIs = false;
  }

  uploadSelectedFile(getParam) {
    console.log("this.fileObj", this.partiSection);
    console.log("this.fileObj", this.groupSection);
    console.log("onloadShownSection", this.onloadShownSection);
    console.log("getParam", getParam);

    this.mainLoaderIs = true;
    const formData = new FormData();

    if (getParam == "parti") {
      formData.append("File", this.partiSection.fileObj);
      this.http.partiFileUploader(formData).subscribe((result: any) => {
        if (result.Result == "Done") {
          this.toastr.success("Participants list uploaded successfuly.");
          this.openSectionByParam(2);
        } else {
          this.toastr.error("Invalid excel...");
          this.cancelSelectedFile();
        }
      });
    } else {
      formData.append("File", this.groupSection.fileObj);
      this.http.groupFileUploader(formData).subscribe((result: any) => {
        if (result.success) {
          this.toastr.success("Slots list updated successfully.");
          this.openSectionByParam(3);
          this.mainLoaderIs = false;
          // setTimeout(() => {
          //   this.router.navigateByUrl("participants");
          // }, 3000);
        } else {
          this.toastr.error("Invalid excel...");
          this.cancelSelectedFile();
        }
      });
    }
  }

  openSectionByParam(param) {
    this.onloadShownSection = param;
    if (param == 1) {
      setTimeout(() => {
        this.dragAndDropElmnt = document.querySelector("#partiDragAndDropBox");
        this.getFileInput = document.querySelector("#partiFileUploader");
        this.cancelSelectedFile();
      }, 500);
    }

    if (param == 2) {
      setTimeout(() => {
        this.dragAndDropElmnt = document.querySelector("#groupDragAndDropBox");
        this.getFileInput = document.querySelector("#grpFileUploader");
        this.cancelSelectedFile();
      }, 500);
    }
  }

  checkPartiAndGroupFileUploaded() {
    var sendData = {
      schoolName: "all",
      branch: "all",
      std: "all",
      event: "all"
    };
    this.http.getGroupList().subscribe((responce: any) => {
      if (responce.success) {
        if (responce.result.length > 0) {
          this.openSectionByParam(3);
        } else {
          this.http.getParticipantCount(sendData).subscribe((responce: any) => {
            if (responce.success) {
              if (responce.total > 0) {
                this.openSectionByParam(2);
              } else {
                this.openSectionByParam(1);
              }
            } else {
              this.toastr.error("Something went wrong!");
            }
          });
        }
      } else {
        this.toastr.error("Something went wrong!");
      }
    });
  }

  fileSetup() {
    this.openSectionByParam(1);
  }
  /*  */
}
