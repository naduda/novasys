import { Component, ElementRef } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { LangService } from '../lang/lang.service';
import { MenuService } from '../menu.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'menu-button',
  templateUrl: './menuButton.component.html',
  styleUrls:['./menuButton.component.css']
})
export class MenuButtonComponent {
  private headers = new Headers({'Content-Type': 'application/json'});
  private destUrl = './assets/jsonSettings/';
  private element: any;
  private settings: any;

  constructor(private elementRef: ElementRef,
              private http: Http,
              private langService: LangService,
              private menuService: MenuService) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit() {
    let attr = this.element.getAttribute('settings');
    this.http.get(this.destUrl + attr + '.json')
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
    .catch(ex => console.error(attr + '\n' + ex));
  }

  onMenuItemClick(item) {
    if(item.name === 'menuFileExit') {
      for(let i = 3; i < 10; i++) {
        let it = this.menuService.menu[i];
        this.menuService.barsButton(it);
      }
      return;
    }
    this.menuService.barsButton(item);
  }
}