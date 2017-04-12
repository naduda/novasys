import { Component, ViewChild, OnInit, DoCheck } from '@angular/core';
import { NgbTabset, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { LangService } from '../../menu/lang/lang.service';
import { MenuService } from '../../menu/menu.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit, DoCheck {
  @ViewChild('ngbTabset') ngbTabset: NgbTabset;
  private oldWidth;

  constructor(private menuService: MenuService,
              public langService: LangService) {
    window.onclick = event => {
      const modal = document.getElementById('myModal');
      if (event.target === modal) {
          modal.style.display = 'none';
      }
    };
    window.onresize = () => {
      const link: any = document.querySelector('a.nav-link.active');
      if (link) {
        link.click();
      }
    };
  }

  ngOnInit() {
    this.menuService.tabComponent = this;
  }

  private isTabFull(): boolean {
    const ul: any = document.querySelector('ngb-tabset > ul');
    const lis = document.querySelectorAll('ngb-tabset > ul > li > a');
    if (!lis || lis.length === 0) {
      return false;
    }
    const ulWidth = ul.offsetWidth;
    let liWidth = Array.prototype.reduce
      .call(lis, (w, e) => w + e.offsetWidth, 0);
    Array.prototype.forEach.call(lis, e => {
      const mItem = this.menuService.menuOrder
        .filter(it => it.name === e.id);
      if (mItem.length > 0) {
        mItem[0].width = e.offsetWidth;
      }
    });

    const bbWidth: any = document
        .querySelector('ngb-tabset > ul > li > a[id="barsButton"]');
    if (bbWidth) {
      liWidth += bbWidth.offsetHeight - bbWidth.offsetWidth;
    }

    if (this.oldWidth === ulWidth - liWidth) {
      return false;
    }
    this.oldWidth = ulWidth - liWidth;

    return ulWidth < liWidth;
  }

  private addItemIfPossible() {
    if (this.oldWidth > 0) {
      let ind = this.menuService.menuOrder.length - 1;
      while (ind > 0 && this.menuService.menuOrder[ind].isVisible) {
        ind--;
      }
      if (this.menuService.menuOrder[ind].width < this.oldWidth) {
        this.menuService.menuOrder[ind].isVisible = true;
      }
    }
  }

  ngDoCheck() {
    if (this.isTabFull()) {
      while (this.oldWidth < 0) {
        const firstItem = this.menuService.menuOrder
          .find(e => e.name !== 'barsButton' && e.isVisible);
        if (!firstItem) {
          return;
        }
        firstItem.isVisible = false;
        this.oldWidth -= firstItem.width;
      }
    }

    this.addItemIfPossible();

    const hideTabs = this.menuService.menuOrder
        .filter(e => e.name !== 'barsButton' && !e.isVisible);
    this.menuService.menuOrder[0].isVisible = hideTabs.length > 0;

    if (this.ngbTabset && this.ngbTabset.activeId) {
      if (this.ngbTabset.activeId === 'barsButton') {
        this.ngbTabset.activeId = this.menuService.lastOrderedItem().name;
      }
    }
  }

  onTabClose(menuItem: any, e: MouseEvent) {
    this.menuService.removeItemFromMenuOrder(menuItem);
    e.preventDefault();
  }

  beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'barsButton') {
      const btn = document.getElementById('myModal');
      const ul = btn.children[0].children[0];
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }

      this.menuService.menuOrder
      .filter(e => !e.isVisible)
      .forEach(e => {
        const li = document.createElement('LI');
        li.innerHTML = this.langService.values[e.name];
        li.id = e.name;
        li.onmouseup = (args) => {
          const id = (args.target as any).id;
          const item = this.menuService.menuOrder
            .filter(it => it.name === id)[0];
          this.menuService.removeItemFromMenuOrder(item);
          btn.style.display = 'none';
          this.menuService.barsButton(item);
        };
        li.onmouseover = () => li.style.cursor = 'pointer';
        ul.appendChild(li);
      });
      btn.style.display = 'block';
      $event.preventDefault();
      return;
    }

    const item = this.menuService.menuOrder
      .filter(e => e.name === $event.nextId)[0];
    this.menuService.removeItemFromMenuOrder(item);
    this.menuService.menuOrder.push(item);
  };
}
