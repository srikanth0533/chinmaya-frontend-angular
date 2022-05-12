import { Component, OnInit,ViewEncapsulation } from "@angular/core";
import { HttpService } from "../service/http.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-participant-status',
  templateUrl: './participant-status.component.html',
  styleUrls: ['../registration-form/registration-form.component.css','./participant-status.component.css'],
  encapsulation: ViewEncapsulation.None,
})


export class ParticipantStatusComponent implements OnInit {
  showRegAlreadyDone:boolean = true;
  finalMultiparticipantList: any=[];
  mainLoaderIs:boolean = false;
  constructor() { }

  ngOnInit() {
    this.finalMultiparticipantList = [
      ...JSON.parse(sessionStorage.getItem("storedMultiParticipant")),
    ];
  }

}
