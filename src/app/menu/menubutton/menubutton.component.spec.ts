import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubuttonComponent } from './menubutton.component';

describe('MenubuttonComponent', () => {
  let component: MenubuttonComponent;
  let fixture: ComponentFixture<MenubuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenubuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
