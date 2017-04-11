import { Component, OnInit } from '@angular/core';
import { LangService } from './lang.service';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.css']
})
export class LangComponent implements OnInit {
  private locales: any[];
  public locale: any;

  constructor(private langService: LangService) {
    this.locale = {};
  }

  ngOnInit() {
    this.langService.getLocales()
    .then((data: any[]) => {
      this.locales = data;
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
    this.langService.getMap(this.locale.name)
      .then(data => this.langService.values = data);
  }
}
