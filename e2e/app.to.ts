import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { NovasysPage } from './app.po';

export class Tab {
  private _instance: ElementFinder;
  private _tabs: ElementArrayFinder;

  constructor(private page: NovasysPage) {
    this._instance = element(by.tagName('app-tab'));
    this._tabs = element.all(by.className('tabTitle'));
  }

  public get instance(): ElementFinder {
    return this._instance;
  }

  public get tabs(): ElementArrayFinder {
    return this._tabs;
  }

  closeActiveTab() {
    const selector = 'ngb-tabset a.nav-link.active > i:last-child';
    element(by.css(selector)).click();
  }

  test() {
    expect(this._instance.isDisplayed()).toBeTruthy();
    for (let i = 0; i < 5; i++) {
      this.page.navigateTo();
      switch (i) {
        case 0: this.testResolution(540, 480); break;
        case 1: this.testResolution(576, 600); break;
        case 2: this.testResolution(768, 600); break;
        case 3: this.testResolution(992, 600); break;
        case 4: this.testResolution(1200, 600); break;
      }
    }
  }

  private testResolution(pageWidth: number, pageHeight: number) {
    this.page.setSize(pageWidth, pageHeight);
    expect(this._tabs.count()).toBe(0);

    this.checkTabsCount(pageWidth, this._tabs.count());
    this.checkCloseTabBug();
  }

  private checkTabsCount(pageWidth: number, expectTabs) {
    const curLang = this.page.lang.currentLanguage;
    this.page.lang.changeLocaleByName('en');
    expect(curLang.getText()).toEqual('English');

    for (let i = 0; i < 7; i++) {
      this.page.menu.clickDropDownMenuItem(1, i);
    }

    let result = this
      .getTabsByPageWidthLocale('en', pageWidth);
    expect(this._tabs.count()).toBe(result);
    this.page.lang.changeLocaleByName('uk');
    result = this
      .getTabsByPageWidthLocale('uk', pageWidth);
    expect(this._tabs.count()).toBe(result);
  }

  private getTabsByPageWidthLocale(
    locale: string, pageWidth: number) {
    switch (pageWidth) {
      case 540:
        return locale === 'en' ? 3 : 2;
      case 576:
        return locale === 'en' ? 4 : 3;
      case 768:
        return locale === 'en' ? 5 : 4;
      case 992:
        return locale === 'en' ? 7 : 6;
      case 1200:
        return locale === 'en' ? 7 : 7;
    }
  }

  private checkCloseTabBug() {
    this._tabs.count().then(count => {
      if (count > 1) {
        const activ = this._instance
          .element(by.css('a.nav-link.active'));
        this._tabs.get(count - 2).click();
        this.closeActiveTab();
        expect(activ.getAttribute('id'))
          .not.toEqual('barsButton');
      }
    });
  }
}
