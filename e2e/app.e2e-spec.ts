import { NovasysPage } from './app.po';

describe('novasys App', () => {
  let page: NovasysPage;

  beforeEach(() => {
    page = new NovasysPage();
    page.init();
  });

  it('should has Novasys title', () => {
    expect(page.title).toEqual('Novasys');
  });

  it('check menu', () => {
    page.menu.test();
  });

  it('check tab', () => {
    page.tab.test();
  });

  it('check translation', () => {
    page.lang.test();
  });
});
