import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { TabComponent } from './tab.component';
import { ContentComponent } from '../content.component';
import { LangService } from '../../lang/lang.service';
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
    lang: {},
    onLanguageChange: () => {}
  };

  for (let i = 0; i < 50; i++) {
    langServiceStub.lang['key_' + i] = 'value_' + i;
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
    langService = fixture.debugElement.injector.get(LangService);
    menuService = fixture.debugElement.injector.get(MenuService);
    component = fixture.componentInstance;

    for (const key in langService.lang) {
      if (langService.lang.hasOwnProperty(key)) {
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
      expect(liText.innerHTML).toEqual(langService.lang[t.name]);
    }
  });
});
