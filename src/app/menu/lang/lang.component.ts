import { Component, OnInit } from '@angular/core';
import { LangService } from './lang.service';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.css']
})
export class LangComponent implements OnInit {
  public locale: any;

  constructor(private langService: LangService) {
    this.locale = new Object();
  }

  ngOnInit() {
    this.langService.getLocales()
    .then((data: any[]) => {
      const novasys: any = localStorage.getItem('novasys');
      const loc = novasys ? JSON.parse(novasys).locale : data[0];
      this.locale = loc;
    })
    .then(() => {
      this.langService.getMap(this.locale.name);
    });
  }

  changeLang(item: any) {
    this.locale = item;
    let novasys: any = localStorage.getItem('novasys');
    novasys = novasys ? JSON.parse(novasys) : new Object();
    novasys.locale = this.locale;
    localStorage.setItem('novasys', JSON.stringify(novasys));
    this.langService.getMap(this.locale.name);
  }
}
