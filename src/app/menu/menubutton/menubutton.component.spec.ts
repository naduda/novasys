import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MenuButtonComponent } from './menubutton.component';
import { LangService } from '../../menu/lang/lang.service';
import { MenuService } from '../../menu/menu.service';

describe('MenubuttonComponent', () => {
  let component: MenuButtonComponent;
  let fixture: ComponentFixture<MenuButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuButtonComponent ],
      imports: [HttpModule],
      providers: [LangService, MenuService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuButtonComponent);
    component = fixture.componentInstance;
    fixture.debugElement.injector.get(LangService);
    fixture.debugElement.injector.get(MenuService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
