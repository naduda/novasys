import { Component, OnInit } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [NgbDropdown],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isCollapsed: boolean;

  constructor() {
    this.isCollapsed = true;
  }

  ngOnInit() {
  }
}
