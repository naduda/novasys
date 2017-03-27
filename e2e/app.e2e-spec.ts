import { NovasysPage } from './app.po';

describe('novasys App', () => {
  let page: NovasysPage;

  beforeEach(() => {
    page = new NovasysPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
