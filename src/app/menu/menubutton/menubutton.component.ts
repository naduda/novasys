import { Component, OnInit, Input } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { LangService } from '../lang/lang.service';
import { MenuService } from '../menu.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menuButton.component.html',
  styleUrls: ['./menuButton.component.css']
})
export class MenuButtonComponent implements OnInit {
  private headers = new Headers({'Content-Type': 'application/json'});
  private destUrl = './assets/jsonSettings/';
  @Input() private fileName: any;
  public settings: any;

  constructor(private http: Http,
              public langService: LangService,
              private menuService: MenuService) {
  }

  ngOnInit() {
    this.http.get(this.destUrl + this.fileName + '.json')
    .toPromise()
    .then(res => {
      this.settings = res.json();
      this.settings.children
        .filter(e => e.name !== 'separator')
        .forEach(e => {
          e.isVisible = false;
          this.menuService.menu.push(e);
        });
    })
    .catch(ex => console.error(this.fileName + '\n' + ex));
  }

  onMenuItemClick(item) {
    const barsButton: any = document.querySelector('span[class="hidden-lg-up"]');
    if (barsButton) {
      barsButton.click();
    }
    if (item.name === 'menuFileExit') {
      for (let i = 3; i < 10; i++) {
        const it = this.menuService.menu[i];
        this.menuService.barsButton(it);
      }
      return;
    }
    this.menuService.barsButton(item);
  }
}
