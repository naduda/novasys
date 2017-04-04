import { Component, ElementRef, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() tabName:any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    //console.log(this.tabName)
    //this.settings = this.elementRef.nativeElement.getAttribute('settings'))
  }

}
