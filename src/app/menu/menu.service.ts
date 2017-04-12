import { Injectable } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class MenuService {
  public menu: any[];
  public menuOrder: any[];
  public tabComponent: any;

  constructor() {
    this.menu = [];
    this.menuOrder = [];
    const barsButton = {
      ico: 'fa fa-caret-down',
      name: 'barsButton'
    };
    this.menu.push(barsButton);
    this.menuOrder.push(barsButton);
  }

  lastOrderedItem = () => this.menuOrder[this.menuOrder.length - 1];

  removeItemFromMenuOrder(item: any) {
    this.menuOrder.forEach((e, ind) => {
      if (e.name === item.name) {
        this.menuOrder.splice(ind, 1);
        return;
      }
    });

    const tabSet: NgbTabset = this.tabComponent.ngbTabset;
    const lastItem = this.menuOrder[this.menuOrder.length - 1];
    tabSet.select(lastItem.name);
  }

  barsButton(item: any) {
    const isOpen = this.menuOrder.find(e => e.name === item.name);
    if (isOpen) {
      return;
    }

    const tabSet = this.tabComponent.ngbTabset;
    tabSet.activeId = item.name;
    item.isVisible = true;
    this.menuOrder.push(item);
  }
}
