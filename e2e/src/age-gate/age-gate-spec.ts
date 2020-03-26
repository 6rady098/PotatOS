import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import { WelcomePage } from './age-gate_methods';


describe('Tests to make sure that the welcome page loads', () => {
  let page: AppPage;
  let welcomePage: WelcomePage;

  beforeEach(() => {
    page = new AppPage();
    welcomePage = new WelcomePage();
  });

  it('should display welcome message', () => {
    page.toWelcomePage();
    expect(welcomePage.getTitleText()).toEqual('Welcome to LinkTheMasses');

  });
});

/**
 * These tests are designed to test the age-gate (the page that confirms your age) on the welcome screen.
 */
describe('Tests the Age-Gate', () => {
  let page: AppPage;
  let welcomePage: WelcomePage;

  beforeEach(() => {
    page = new AppPage();
    welcomePage = new WelcomePage();
  });

  /**
   * This tests the case where the date entered is today's date
   * 
   * It fails if the age-gate allows the user to proceed to the login page
   */
  it('should input the current date into the Age-Gate and get a warning', () => {
    let date = welcomePage.formatDate(new Date());
    page.toWelcomePage();
    welcomePage.inputAge(date);
    welcomePage.clickAgeConfirm()
      .then(() => {
        expect(welcomePage.getPopUp().getText()).toContain('Access denied!');
        browser.sleep(2000);
        welcomePage.clickPopUp();
      })
      .catch(() => {
        fail();
      });
  });

  /**
   * This tests the case where the date (day + month) is the same as today, 
   * but only 17 years in the past.
   * 
   * It fails if the age-gate allows the user to proceed to the login page
   */
  it('should fail to pass the age-gate with a birthdate 17 years ago', () => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 17);

    page.toWelcomePage();
    welcomePage.inputAge(welcomePage.formatDate(date));
    welcomePage.clickAgeConfirm()
      .then(() => {
        expect(welcomePage.getPopUp().getText()).toContain('Access denied!');
        browser.sleep(2000);
        welcomePage.clickPopUp();
      })
      .catch(() => {
        fail();
      });
  });

  /**
   * This tests the boundary case where the year is (current year - 18), but the day is one day short of being a full
   * 18 years in the past.
   * 
   * It fails if the user is able to proceed to the login page.
   */
  it('should fail to pass the age-gate with a birthdate 18 years minus 1 day from today', () => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    date.setDate(date.getDate() + 1);

    page.toWelcomePage();
    welcomePage.inputAge(welcomePage.formatDate(date));
    welcomePage.clickAgeConfirm()
      .then(() => {
        expect(welcomePage.getPopUp().getText()).toContain('Access denied!');
        welcomePage.clickPopUp();
      })
      .catch(() => {
        fail();
      });
  });

  /**
   * This tests the bonudary case where the birthday is 18 years ago exactly.
   * 
   * It succeeds if the user makes it to the login page.
   */
  it('should successfully pass the age gate with a date 18 years prior', () => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 18);

    page.toWelcomePage();
    welcomePage.inputAge(welcomePage.formatDate(date));
    welcomePage.clickAgeConfirm()
      .then(() => {
        welcomePage.findLoginPageMessage()
          .then((value) => {
            expect(value).toEqual('A web application for supporting a network for researchers and participants');
          })
          .catch(() => {
            fail();
          });
      })
      .catch(() => {
        fail();
      });
  });

  /**
   * This tests the case where the birthday is 19 years in the past.
   * 
   * It succeeds if the user is able to reach the login page.
   */
  it('should successfully pass the age gate with a date 19 years prior', () => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 18);

    page.toWelcomePage();
    welcomePage.inputAge(welcomePage.formatDate(date));
    welcomePage.clickAgeConfirm()
      .then(() => {
        welcomePage.findLoginPageMessage()
          .then((value) => {
            expect(value).toEqual('A web application for supporting a network for researchers and participants');
          })
          .catch(() => {
            fail();
          });
      })
      .catch(() => {
        fail();
      });
  });


  /**
   * This tests the boundary case where the birthdate is 18 years in the past, plus 1 day
   * 
   * Succeeds if the user makes it to the login page.
   */
  it('should successfully pass the age gate with a date 18 years prior plus 1 day', () => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    date.setDate(date.getDate() - 1);

    page.toWelcomePage();
    welcomePage.inputAge(welcomePage.formatDate(date));
    welcomePage.clickAgeConfirm()
      .then(() => {
        welcomePage.findLoginPageMessage()
          .then((value) => {
            expect(value).toEqual('A web application for supporting a network for researchers and participants');
          })
          .catch(() => {
            fail();
          });
      })
      .catch(() => {
        fail();
      });
  });

  afterEach(async () => {


    /*
    * Note: the code below was auto-generated by Protractor/Angular, but causes errors in Firefox
    * 
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
    */
  });
});
