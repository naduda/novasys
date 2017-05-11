import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { AppModule } from './app.module';
import { CommonModule } from 'prNgCommon/common.module';
import { LangService } from 'prNgCommon/lang/lang.service';
import { MenuService } from './menu/menu.service';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppModule,
        NgbModule.forRoot(),
        CommonModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should have isCollapsed = true', async(() => {
    expect(component.isCollapsed).toEqual(true);
  }));
});
