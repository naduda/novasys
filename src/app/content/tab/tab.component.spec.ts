import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { TabComponent } from './tab.component';
import { ContentComponent } from '../content.component';
import { LangService } from 'prNgCommon/lang/lang.service';
import { MenuService } from '../../menu/menu.service';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;
  let langService;
  let menuService;
  const barsButton = {
    ico: 'fa fa-caret-down',
    name: 'barsButton'
  };
  const langServiceStub: any = {
    ready: true,
    onLanguageChange: () => {}
  };

  for (let i = 0; i < 50; i++) {
    langServiceStub['key_' + i] = 'value_' + i;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabComponent, ContentComponent ],
      imports: [HttpModule, NgbModule.forRoot()],
      providers: [
        {provide: LangService, useValue: langServiceStub},
        MenuService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    langService = fixture.debugElement.injector.get(LangService);
    menuService = fixture.debugElement.injector.get(MenuService);

    for (const key in langService) {
      if (langService.hasOwnProperty(key) && key.startsWith('key_')) {
        menuService.tabs.push({
          ico: 'fa fa-bars',
          name: key
        });
      }
    }
    fixture.detectChanges();

    for (const t of menuService.tabs) {
      if (t.name === 'barsButton') {
        continue;
      }
      menuService.openTab(t);
      fixture.detectChanges();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.ngbTabset).toBeDefined();
  });

  it('should create tabs (visible/unvisible)', () => {
    const ul = fixture.debugElement
      .query(By.css('ngb-tabset > ul')).nativeElement;
    const visTabs = menuService.openedTabs
      .filter(t => t.isVisible).length;
    expect(ul.children.length).toBe(visTabs);

    component.ngbTabset.select('barsButton');
    fixture.detectChanges();
    const bars = fixture.debugElement
      .query(By.css('.modal-content > ul')).nativeElement;
    expect(bars.children.length)
      .toBe(menuService.openedTabs.length - visTabs);
  });

  it('should translate tabs', () => {
    const visTabs = menuService.openedTabs
      .filter(t => t.isVisible && t.name !== 'barsButton');

    for (const t of visTabs) {
      component.ngbTabset.select(t.name);
      fixture.detectChanges();
      const liText = fixture.debugElement
        .query(By.css('ngb-tabset a.nav-link.active > span'))
        .nativeElement;
      expect(liText.innerHTML).toEqual(langService[t.name]);
    }
  });
});
