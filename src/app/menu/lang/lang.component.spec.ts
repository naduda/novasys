import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { LangService } from './lang.service';
import { LangComponent } from './lang.component';

describe('LangComponent', () => {
  let component: LangComponent;
  let fixture: ComponentFixture<LangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangComponent ],
      providers: [LangService],
      imports: [HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
