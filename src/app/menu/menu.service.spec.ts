import { TestBed, inject } from '@angular/core/testing';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService]
    });
  });

  it('should has hidden barsBuuton', inject([MenuService], (service: MenuService) => {
    expect(service).toBeTruthy();
    expect(service.tabs.length).toBe(1);
    expect(service.openedTabs.length).toBe(1);
    expect(service.openedTabs[0].name).toEqual('barsButton');
    expect(service.openedTabs[0].isVisible).toBeFalsy();
  }));

  it('check openTab, lastOpenedItem',
    inject([MenuService], (service: MenuService) => {
    service.tabComponent = {
      ngbTabset: new NgbTabset({justify: 'start', type: 'tabs'})
    };

    for (let i = 0; i < 3; i++) {
      const item = {
        ico: 'icoClass _' + i,
        name: 'itemName_' + i
      };
      service.tabs.push(item);
      service.openTab(item);
    }
    expect(service.openedTabs.length).toBe(4);
    expect(service.lastOpenedItem().name).toEqual('itemName_2');
  }));
});
