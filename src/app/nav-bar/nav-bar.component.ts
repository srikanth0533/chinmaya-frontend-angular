import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['../app.component.css', './nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  activePage: any = "";
  constructor(private router: Router) {
  
    router.events.subscribe((val: any) => {
      if(val.url){
        this.activePage = val.url.replace("/", "");
      }
    });
   }

  ngOnInit() {
  
  }

  redirect(page) {
      this.router.navigate([page]);
  }
}
