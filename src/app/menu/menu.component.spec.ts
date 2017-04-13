import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MenuComponent } from './menu.component';
import { MenuButtonComponent } from '../menu/menuButton/menubutton.component';
import { LangService } from '../menu/lang/lang.service';
import { MenuService } from '../menu/menu.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent, MenuButtonComponent ],
      imports: [HttpModule],
      providers: [LangService, MenuService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
