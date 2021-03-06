import { Injectable } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class MenuService {
  public tabs: any[];
  public openedTabs: any[];
  public tabComponent: any;

  constructor() {
    this.tabs = [];
    this.openedTabs = [];
    const barsButton = {
      ico: 'fa fa-caret-down',
      name: 'barsButton'
    };
    this.tabs.push(barsButton);
    this.openedTabs.push(barsButton);
  }

  lastOpenedItem = () => this.openedTabs[this.openedTabs.length - 1];

  removeItemFromOpenedTabs(item: any) {
    this.openedTabs.forEach((e, ind) => {
      e.isVisible = true;
      if (e.name === item.name) {
        this.openedTabs.splice(ind, 1);
      }
    });

    const tabSet: NgbTabset = this.tabComponent.ngbTabset;
    const lastOpenTab = this.lastOpenedItem();
    tabSet.select(lastOpenTab);
    tabSet.activeId = lastOpenTab.name;
  }

  openTab(item: any) {
    const isOpen = this.openedTabs.find(e => e.name === item.name);
    if (isOpen) {
      return;
    }

    const tabSet = this.tabComponent.ngbTabset;
    tabSet.activeId = item.name;
    item.isVisible = true;
    this.openedTabs.push(item);
  }
}
