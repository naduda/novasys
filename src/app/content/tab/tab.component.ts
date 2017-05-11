import { Component, ChangeDetectorRef, ViewChild, OnInit, DoCheck, AfterViewChecked } from '@angular/core';
import { NgbTabset, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { LangService } from 'prNgCommon/lang/lang.service';
import { MenuService } from '../../menu/menu.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit, DoCheck, AfterViewChecked {
  @ViewChild('tabset') ngbTabset: NgbTabset;

  constructor(private menuService: MenuService,
              public lang: LangService,
              private changeDetector: ChangeDetectorRef) {
    window.onclick = event => {
      const modal = document.getElementById('myModal');
      if (event.target === modal) {
          modal.style.display = 'none';
      }
    };
    window.onresize = () => {
      this.menuService.openedTabs.forEach(t => t.isVisible = true);
      this.ngDoCheck();
      const link: any = document.querySelector('a.nav-link.active');
      if (link) {
        link.click();
      }
    };
  }

  ngOnInit() {
    this.menuService.tabComponent = this;
    this.lang.onLanguageChange(locale => {
      this.menuService.openedTabs.forEach(t => t.isVisible = true);
      this.changeDetector.detectChanges();
    });
  }

  private getDelta(): number {
    const ul: any = document.querySelector('ngb-tabset > ul');
    if (!ul) {
      return undefined;
    }
    const ulWidth = ul.offsetWidth;
    const lis = document.querySelectorAll('ngb-tabset > ul > li > a');
    if (!lis || lis.length === 0) {
      return undefined;
    }
    let liWidth = Array.prototype.reduce
      .call(lis, (w, e) => w + e.offsetWidth, 0);
    const bbWidth: any = document
        .querySelector('ngb-tabset > ul > li > a[id="barsButton"]');
    if (bbWidth) {
      liWidth += bbWidth.offsetHeight - bbWidth.offsetWidth;
    }

    Array.prototype.forEach.call(lis, e => {
      const mItem = this.menuService.openedTabs
        .filter(it => it.name === e.id);
      if (mItem.length > 0) {
        mItem[0].width = e.offsetWidth;
      }
    });
    return ulWidth - liWidth;
  }

  ngAfterViewChecked() {
    const delta = this.getDelta();
    if (!delta) {
      return;
    }
    if (delta < 0) {
      this.ngDoCheck();
      this.changeDetector.detectChanges();
    }
  }

  ngDoCheck() {
    let delta = this.getDelta();
    while (delta && delta < 0) {
      const visTab = this.menuService.openedTabs
            .find(t => t.isVisible && t.name !== 'barsButton');
      if (visTab) {
        visTab.isVisible = false;
        delta += visTab.width;
      }
    }

    const hideTabs = this.menuService.openedTabs
        .filter(t => !t.isVisible && t.name !== 'barsButton');
    this.menuService.openedTabs[0].isVisible = hideTabs.length > 0;
  }

  onTabClose(menuItem: any, e: MouseEvent) {
    this.menuService.removeItemFromOpenedTabs(menuItem);
    e.preventDefault();
  }

  beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'barsButton') {
      const btn = document.getElementById('myModal');
      const ul = btn.children[0].children[0];
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }

      this.menuService.openedTabs
      .filter(e => !e.isVisible)
      .forEach(e => {
        const li = document.createElement('LI');
        li.innerHTML = this.lang[e.name];
        li.id = e.name;
        li.onmouseup = (args) => {
          const id = (args.target as any).id;
          const item = this.menuService.openedTabs
            .filter(it => it.name === id)[0];
          this.menuService.removeItemFromOpenedTabs(item);
          btn.style.display = 'none';
          this.menuService.openTab(item);
        };
        li.onmouseover = () => li.style.cursor = 'pointer';
        ul.appendChild(li);
      });
      btn.style.display = 'block';
      $event.preventDefault();
      return;
    }
  };
}
