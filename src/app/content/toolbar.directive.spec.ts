import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToolbarDirective } from './toolbar.directive';

@Component({
  template: `
  <div>
    <div appToolbar></div>
    <div appToolbar></div>
    <div appToolbar></div>
  </div>`
})
class TestComponent { }

describe('ToolbarDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ ToolbarDirective, TestComponent ]
    })
    .createComponent(TestComponent);
    fixture.detectChanges();
    des = fixture.debugElement.queryAll(By.directive(ToolbarDirective));
  });

  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  });
});
