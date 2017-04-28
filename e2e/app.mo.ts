import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { NovasysPage } from './app.po';

export class Menu {
  private _barsButton: ElementFinder;
  private _instance: ElementFinder;
  private _buttons: ElementArrayFinder;

  constructor(private page: NovasysPage) {
    this._instance = element(by.tagName('app-menu'));
    this._barsButton = element(by.css('span.hidden-lg-up'));
    this._buttons = element.all(by.css('app-menu-button'));
  }

  public get instance(): ElementFinder {
    return this._instance;
  }

  public get barsButton(): ElementFinder {
    return this._barsButton;
  }

  public get buttons(): ElementArrayFinder {
    return this._buttons;
  }

  clickMenuItem(btnIndex: number): void {
    this.clickDropDownMenuItem(btnIndex, -1);
  }

  clickDropDownMenuItem(btnIndex: number,
    dropDownItemIndex: number): void {
    const btn = this._buttons.get(btnIndex)
      .element(by.css('span.dropdown-toggle'));
    const ddMenu = this._buttons.get(btnIndex)
      .element(by.className('dropdown-menu'));
    const menuItems = this._buttons.get(btnIndex)
      .all(by.className('dropdown-item'));

    this._instance.isDisplayed().then(visible => {
      if (!visible) {
        this._barsButton.click();
      }
      expect(this._instance.isDisplayed()).toBeTruthy();
      expect(ddMenu.isDisplayed()).toBeFalsy('drop-down menu is not visible');
      btn.click();
      expect(ddMenu.isDisplayed()).toBeTruthy('drop-down menu visible');
      if (dropDownItemIndex >= 0) {
        menuItems.get(dropDownItemIndex).click();
      }
    });
  }

  private separatorClicCheck() {
    const separators = this._buttons.get(1)
      .all(by.className('dropdown-divider'));
    this.clickMenuItem(1);
    expect(separators.count()).toBe(7);
    expect(this.page.tab.tabs.count()).toBe(0);
  }

  test() {
    expect(this._buttons.count()).toBe(3, 'expect 3 buttons');
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
    const menuIsVisible = pageWidth >= 992;

    expect(this._instance.isDisplayed()).toBe(menuIsVisible,
      'visibility menu pageWidth: ' + pageWidth);
    expect(this._barsButton.isDisplayed()).not.toBe(menuIsVisible,
      'visibility menu pageWidth: ' + pageWidth);

    this.checkMenuButtonClick(menuIsVisible);
    this.checkLogoPositionBag();
  }

  private checkMenuButtonClick(menuIsVisible: boolean) {
    const refButton = this._buttons.get(1);
    const ddMenu = refButton.element(by.className('dropdown-menu'));
    const menuItems = ddMenu.all(by.className('dropdown-item'));
    const tabs = this.page.tab.tabs;

    expect(tabs.count()).toBe(0, 'any tab');
    this.clickDropDownMenuItem(1, 1);
    expect(ddMenu.isDisplayed()).toBeFalsy('drop-down menu is not visible');
    expect(tabs.count()).toBe(1, 'one tab');

    this.clickDropDownMenuItem(1, 2);
    expect(tabs.count()).toBe(2, 'two tabs');
  }

  private checkLogoPositionBag() {
    const header = element(by.css('div.fixed-top'));
    const langElement = element(by.css('app-lang > div'));
    expect(header.getCssValue('height'))
      .toBe(langElement.getCssValue('height'));
  }
}
