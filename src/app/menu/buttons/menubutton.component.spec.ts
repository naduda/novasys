import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { MenuButtonComponent } from './menubutton.component';
import { LangService } from '../../lang/lang.service';
import { MenuService } from '../../menu/menu.service';

describe('MenubuttonComponent', () => {
  let component: MenuButtonComponent;
  let fixture: ComponentFixture<MenuButtonComponent>;
  let langService;
  const langServiceStub: any = {
    lang: {
      menuItem: 'menuItem_translated',
      child_1: 'child_1_translated',
      child_2: 'child_2_translated',
      child_3: 'child_3_translated'
    }
  };
  const settings = {
    name: 'menuItem',
    children: [
      {name: 'child_1', ico: 'child clas'},
      {name: 'separator'},
      {name: 'child_2'},
      {name: 'child_3', ico: 'child clas'},
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuButtonComponent ],
      imports: [HttpModule],
      providers: [
        {provide: LangService, useValue: langServiceStub},
        MenuService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuButtonComponent);
    component = fixture.componentInstance;
    component.settings = settings;
    langService = fixture.debugElement.injector.get(LangService);
    fixture.debugElement.injector.get(MenuService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check component', () => {
    const menuItemText = fixture.debugElement
      .query(By.css('span[ngbDropdownToggle]'));
    expect(menuItemText.nativeElement.textContent)
      .toEqual(langService.lang[settings.name]);

    const children = fixture.debugElement
      .queryAll(By.css('div[class="dropdown-menu"] > div'));
    for (let i = 0; i < children.length; i++) {
      if (i === 1) {
        const _class = children[i].nativeElement
          .getAttribute('class');
        expect(_class).toContain('dropdown-divider');
        continue;
      }
      const span = children[i].nativeElement
        .getElementsByTagName('span')[0];
      const text = langService.lang[settings.children[i].name];
      expect(span.textContent).toEqual(text);
    }
  });
});
