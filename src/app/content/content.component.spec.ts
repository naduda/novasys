import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LangService } from 'prNgCommon/lang/lang.service';
import { ContentComponent } from './content.component';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let langService: LangService;
  const langServiceStub = {
      testButton: 'Test Button'
  };
  const expectedTab = 'testButton';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentComponent ],
      imports: [HttpModule],
      providers: [{provide: LangService, useValue: langServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    component.tabName = expectedTab;
    langService = fixture.debugElement.injector.get(LangService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "testButton"', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const tabNameEl  = fixture.debugElement.query(By.css('div.tabcontent'));
      expect(tabNameEl.nativeElement.textContent.trim())
        .toEqual(langService[expectedTab]);
    });
  }));
});
