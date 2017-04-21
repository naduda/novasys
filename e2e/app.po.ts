import { browser, element, by } from 'protractor';

export class NovasysPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }
}
