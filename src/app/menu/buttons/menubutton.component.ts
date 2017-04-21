import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { LangService } from '../lang/lang.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menuButton.component.html',
  styleUrls: ['./menuButton.component.css']
})
export class MenuButtonComponent implements OnInit {
  private destUrl = './assets/jsonSettings/';
  @Input() private fileName: any;
  public settings: any;

  constructor(private http: Http,
              public langService: LangService,
              private menuService: MenuService) {}

  ngOnInit() {
    if (!this.fileName) {
      return;
    }

    this.http.get(this.destUrl + this.fileName + '.json')
    .toPromise().then(res => {
      this.settings = res.json();
      this.settings.children
        .filter(e => e.name !== 'separator')
        .forEach(e => {
          e.isVisible = false;
          this.menuService.tabs.push(e);
        });
    })
    .catch(ex => console.error(this.fileName + '\n' + ex));
  }

  onMenuItemClick(item) {
    if (item.name === 'separator') {
      return;
    }

    const barsButton: any = document.querySelector('span[class="hidden-lg-up"]');
    if (barsButton) {
      barsButton.click();
    }
    if (item.name === 'menuFileExit') {
      for (let i = 3; i < 10; i++) {
        const it = this.menuService.tabs[i];
        this.menuService.openTab(it);
      }
      return;
    }
    this.menuService.openTab(item);
  }
}
