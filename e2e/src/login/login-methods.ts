import { element, by, browser, promise } from 'protractor';

export class LoginPage {
  
  login(username, password) {
    this.getLoginButton().click();
    element(by.name('username')).sendKeys(username);
    element(by.name('password')).sendKeys(password);
    return element(by.xpath('/html/body/app-root/main/app-login/div/div/button[1]')).click();
  }

  checkPublishedStudiesTab() {
    return element(by.xpath('/html/body/app-root/app-header/mat-toolbar/ul[2]/li[1]/button/span')).getText() as Promise<string>;
  }

  checkLoginButton() {
    return element(by.xpath('/html/body/app-root/main/app-login/div/div/button[1]')).isDisplayed();
  }

  clickCloseButton() {
    return element(by.xpath('/html/body/app-root/main/app-login/div/div/button[2]')).click();
  }

  getLoginButton() {
    return element(by.xpath('/html/body/app-root/main/app-login/div[1]/div/div[2]/div/div[1]/button/span'));
  }
}