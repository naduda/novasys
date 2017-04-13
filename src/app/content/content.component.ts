import { Component, Input } from '@angular/core';
import { LangService } from '../menu/lang/lang.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  @Input() tabName: string;

  constructor(public langService: LangService) {}
}
