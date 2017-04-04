import {Component, ElementRef} from '@angular/core';
import {LangService} from './lang.service';
import {KeyValue} from './KeyValue'

@Component({
  selector: 'lang',
  templateUrl: './lang.component.html',
  styleUrls:['./lang.component.css']
})
export class LangComponent {
  private locales: any[];
  private locale: any;

  constructor(private langService: LangService) {
    this.locale = {};
  }

  ngOnInit() {
    this.langService.getLocales()
    .then((data: any[]) => {
      this.locales = data;
      let novasys: any = localStorage.getItem('novasys');
      let loc = novasys ? JSON.parse(novasys).locale : data[0];
      this.locale = loc;
    })
    .then(() => {
      this.langService.getMap(this.locale.name);
    });
  }

  changeLang(item:any) {
    this.locale = item;
    let novasys: any = localStorage.getItem('novasys');
    novasys = novasys ? JSON.parse(novasys) : new Object();
    novasys.locale = this.locale;
    localStorage.setItem('novasys', JSON.stringify(novasys));
    this.langService.getMap(this.locale.name)
      .then(data => this.langService.values = data);
  }
}