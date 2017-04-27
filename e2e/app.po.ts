import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { Language } from './app.lo';
import { Menu } from './app.mo';
import { Tab } from './app.to';

export class NovasysPage {
  private deltaWidth: number;
  private _lang: Language;
  private _menu: Menu;
  private _tab: Tab;

  constructor() { }

  public get title() {
    return browser.getTitle();
  }

  init() {
    this.navigateTo();
    this.setSize(1200, 670);
    this._lang = new Language(this);
    this._menu = new Menu(this);
    this._tab = new Tab(this);
  }

  public get lang(): Language {
    return this._lang;
  }

  public get menu(): Menu {
    return this._menu;
  }

  public get tab(): Tab {
    return this._tab;
  }

  debug() {
    browser.debugger();
  }

  pause(value?: number) {
    browser.pause(value);
  }

  setSize(w: number, h: number): any {
    const win = browser.manage().window();
    if (!this.deltaWidth) {
      win.setSize(w, h).then(() => {
        win.setPosition(0, 0);
        const body = element(by.css('.container-fluid'));
        body.getSize().then(b => {
          this.deltaWidth = w - b.width;
          win.setSize(w + this.deltaWidth, h);
        });
      });
    } else {
      win.setSize(w + this.deltaWidth, h);
    }
  }

  navigateTo(path?: string) {
    return browser.get(path || '/');
  }
}
