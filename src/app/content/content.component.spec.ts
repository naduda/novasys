import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LangService } from '../menu/lang/lang.service';
import { ContentComponent } from './content.component';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentComponent ],
      imports: [HttpModule],
      providers: [LangService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    let langService = fixture.debugElement.injector.get(LangService);
    let spy = spyOn(langService, 'getMap').and
      .returnValue(Promise.resolve({testButton: 'testButton'}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "testButton"', () => {
    let langService: LangService = fixture.debugElement.injector.get(LangService);
    langService.getMap('uk').then(data => {
      const tabName = 'testButton';
      const tabNmaEl  = fixture.debugElement.query(By.css('div'));
      component.tabName = tabName;
      fixture.detectChanges();
      expect(tabNmaEl.nativeElement.textContent).toContain(tabName);
    });
  });
});
