import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabComponent } from './tab.component';
import { ContentComponent } from '../content.component';
import { LangService } from '../../menu/lang/lang.service';
import { MenuService } from '../../menu/menu.service';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabComponent, ContentComponent ],
      imports: [HttpModule, NgbModule.forRoot()],
      providers: [LangService, MenuService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.debugElement.injector.get(LangService);
    fixture.debugElement.injector.get(MenuService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
