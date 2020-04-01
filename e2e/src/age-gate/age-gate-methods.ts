import { browser, by, element } from 'protractor';

export class WelcomePage {

  inputAge(date) {
    var field = element(by.xpath('/html/body/app-root/main/app-age-gate/html/body/div/mat-form-field/div/div[1]/div[1]/input'));
    return field.sendKeys(date);
  }

  clickAgeConfirm() {
    return element(by.xpath('/html/body/app-root/main/app-age-gate/html/body/div/button/span')).click();
  }

  clickPopUp() {
    return this.getPopUp().accept();
  }

  formatDate(date) {
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
  }

  getTitleText() {
    return element(by.tagName("h1")).getText() as Promise<string>;
  }

  getPopUp() {
    return browser.switchTo().alert();
  }

  findLoginPageMessage() {
    return element(by.xpath('/html/body/app-root/main/app-login/div[1]/div/div[2]/p')).getText() as Promise<string>;
  }
}