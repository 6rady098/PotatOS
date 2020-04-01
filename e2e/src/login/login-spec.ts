import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import { LoginPage } from './login-methods';


describe('Tests to make sure that the welcome page loads', () => {
  let page: AppPage;
  let loginPage: LoginPage;

  beforeEach(() => {
    page = new AppPage();
    loginPage = new LoginPage();
  });

  it('should login as a researcher', () => {
    page.toLoginPage();
    loginPage.login('Fred', 'password')
      .then(() => {
        loginPage.checkPublishedStudiesTab()
          .then((text) => {
            expect(text).toContain('Published Studies');
          })
          .catch(() => {
            fail();
          });
      })
      .catch(() => {
        fail();
      });
  });

  it('should fail to login with an invalid password', () => {
    page.toLoginPage();
    loginPage.login('Fred', 'WrongPassword')
      .then(() => {
        loginPage.checkLoginButton()
          .then((displayed) => {
            if(!displayed)
              fail();
          })
      });
  });

  it('should fail to login with an invalid username', () => {
    page.toLoginPage();
    loginPage.login('WrongFred', 'password')
      .then(() => {
        loginPage.checkLoginButton()
          .then((displayed) => {
            if(!displayed)
              fail();
          })
      });
  });


  it('should login as a participant', () => {
    page.toLoginPage();
    loginPage.login('Fred2', 'password')
      .then(() => {
        loginPage.checkPublishedStudiesTab()
          .then((text) => {
            expect(text).toContain('Available Studies');
          })
          .catch(() => {
            fail();
          });
      })
      .catch(() => {
        fail();
      });
  });

  it('should login as an admin', () => {
    page.toLoginPage();
    loginPage.login('Fred3', 'password')
      .then(() => {
        loginPage.checkPublishedStudiesTab()
          .then((text) => {
            expect(text).toContain('Available Studies');
          })
          .catch(() => {
            fail();
          });

      })
      .catch(() => {
        fail();
      });
  });

  it('should click the close button on the login page', () => {
    page.toLoginPage();
    loginPage.getLoginButton().click();
    loginPage.clickCloseButton()
      .then(() => {
        browser.sleep(2000);
        loginPage.getLoginButton()
        .isDisplayed()
          .then((displayed) => {
            if(!displayed)
              fail();
          });
      });
  });
});