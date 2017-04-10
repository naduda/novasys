import {Component} from '@angular/core';
import {LangService} from './menu/lang/lang.service';
import {KeyValue} from './menu/lang/KeyValue';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private values:any;
  private isCollapsed: boolean;

  constructor(private langService: LangService){
    this.values = langService.values;
    this.isCollapsed = true;
  }
}
