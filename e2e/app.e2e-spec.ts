import { Ang4EcomDashboardPage } from './app.po';

describe('ang4-ecom-dashboard App', () => {
  let page: Ang4EcomDashboardPage;

  beforeEach(() => {
    page = new Ang4EcomDashboardPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
