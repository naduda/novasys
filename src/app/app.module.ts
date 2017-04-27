import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LangService } from './lang/lang.service';
import { MenuService } from './menu/menu.service';

import { AppComponent } from './app.component';
import { LangComponent } from './lang/lang.component';
import { MenuButtonComponent } from './menu/buttons/menubutton.component';
import { MenuComponent } from './menu/menu.component';
import { TabComponent } from './content/tab/tab.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    LangComponent,
    MenuButtonComponent,
    MenuComponent,
    TabComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [LangService, MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
