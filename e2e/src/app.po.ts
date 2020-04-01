import { browser, by, element } from 'protractor';
import { WelcomePage } from './age-gate/age-gate-methods';

export class AppPage {
  toWelcomePage() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  toLoginPage() {
    this.toWelcomePage().then(() => {
      let welcome = new WelcomePage();
      let date = new Date();
      date.setFullYear(date.getFullYear() - 19);
      let dateString = welcome.formatDate(date);

      welcome.inputAge(dateString);
      welcome.clickAgeConfirm();
    })
  }
}
