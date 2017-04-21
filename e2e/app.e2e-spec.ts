import { NovasysPage } from './app.po';

describe('novasys App', () => {
  let page: NovasysPage;

  beforeEach(() => {
    page = new NovasysPage();
  });

  it('should has Novasys title', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Novasys');
  });
});
