import { Injectable } from '@angular/core';

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

  removeItemFromMenuOrder(item: any) {
    this.menuOrder.forEach((e, ind) => {
      if (e.name === item.name) {
        this.menuOrder.splice(ind, 1);
        return;
      }
    });
  }

  barsButton(item: any) {
    const isOpen = this.menuOrder
        .filter(e => e.name === item.name).length > 0;
    if (isOpen) {
      return;
    }

    const tabSet = this.tabComponent.ngbTabset;
    if (item) {
      tabSet.activeId = item.name;
    }
    item.width = 0;
    item.isVisible = true;
    this.menuOrder.push(item);
  }
}
