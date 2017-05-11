import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from 'prNgCommon/common.module';
import { LangService } from 'prNgCommon/lang/lang.service';
import { MenuService } from './menu/menu.service';

import { AppComponent } from './app.component';
import { MenuButtonComponent } from './menu/buttons/menubutton.component';
import { MenuComponent } from './menu/menu.component';
import { TabComponent } from './content/tab/tab.component';
import { ContentComponent } from './content/content.component';
import { ToolbarDirective } from './content/toolbar.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuButtonComponent,
    MenuComponent,
    TabComponent,
    ContentComponent,
    ToolbarDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    CommonModule
  ],
  providers: [LangService, MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
