import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { NovasysPage } from './app.po';

export class Language {
  private button: ElementFinder;
  private langs: ElementArrayFinder;
  private curLang: ElementFinder;

  constructor(private page: NovasysPage) {
    this.button = element(by.tagName('app-lang'));
    this.langs = this.button
      .all(by.css('div.dropdown-menu > button'));
    this.curLang = this.button.element(by.css('div > span'));
  }

  public get currentLanguage(): ElementFinder {
    return this.curLang;
  }

  public get currentLocale(): ElementFinder {
    return this.curLang.element(by.tagName('img'));
  }

  private localeName(l) {
    return l.element(by.tagName('span')).getText();
  }

  changeLocaleByName(name: string) {
    const imgs = this.button
      .all(by.css('div.dropdown-menu > button > img'));
    imgs.then(items => {
      for (let i = 0; i < items.length; i++) {
        items[i].getAttribute('alt').then(v => {
          if (v === name.toUpperCase()) {
            this.button.click();
            this.langs.get(i).click();
            return;
          }
        });
      }
    });
  }

  test() {
    this.changeLocaleByName('uk');
    expect(this.curLang.getText()).toEqual('Українська');
    this.changeLocaleByName('en');
    expect(this.curLang.getText()).toEqual('English');
    this.changeLocaleByName('ru');
    expect(this.curLang.getText()).toEqual('Русский');

    this.langs.then(items => {
      expect(items.length).toBe(3);
      let localeName;
      for (const l of items) {
        this.button.click();
        localeName = this.localeName(l);
        l.click();
        expect(this.curLang.getText()).toEqual(localeName);

        localeName.then(localeText => {
          const btnFile = this.page.menu.buttons.get(0)
            .element(by.css('span.dropdown-toggle'));
          switch (localeText) {
            case 'Українська':
            case 'Русский':
              expect(btnFile.getText()).toEqual('Файл');
              break;
            case 'English':
              expect(btnFile.getText()).toEqual('File');
              break;
          }
        });
      }
    });
  }
}
