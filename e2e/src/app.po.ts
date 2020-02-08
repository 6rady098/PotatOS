import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    //return element(by.css('app-root .content span')).getText() as Promise<string>;
    return element(by.tagName("h1")).getText() as Promise<string>;
  }

  clickResearcherLogin() {
    element(by.id("researcher")).click();
    return element(by.tagName("h1")).getText() as Promise<string>;
  }

  loginResearcher() {
    this.clickResearcherLogin();
    element(by.id('Login')).click();
    element(by.name('username')).sendKeys('Fred');
    element(by.name('password')).sendKeys('Password');
    element(by.name('Login2')).click();

    browser.sleep(10000);
  }
}
