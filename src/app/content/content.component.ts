import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  @Input() tabName: any;

  constructor(private elementRef: ElementRef) { }
}
