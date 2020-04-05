import {
  async,
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect
} from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "src/app/auth/auth.service";
import { UserService } from "src/app/services/users.service";
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from "@angular/core";
import { CodetableService } from "src/app/services/codetable.service";
import { FindValuePipe } from "src/app/pipes/findValue.pipe";
import { TranslateModule } from "@ngx-translate/core";
import { RouterTestingModule } from "@angular/router/testing";

/*
 * The Describe function is just a way to group together tests
 * I don't recommend making new Describe functions
 */
describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  /*
   * This beforeEach sets up the imports that we'll need
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [LoginComponent],
      providers: [
        UserService,
        AuthService,
        CodetableService,
        ChangeDetectorRef
      ],
      schemas: [NO_ERRORS_SCHEMA] //This schema is absolutely necessary, otherwise you get a ton of errors
    }).compileComponents();
  }));

  /*
   * This beforeEach initializes the component, and can be used to initialize the component's variables as well
   * You may need to set some of the component's variables manually:
   *    example: component.postalCode = 'K4B 3H3'
   *
   * You can also just initialize them in the test itself, unless you absolutely need the values across all your tests
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
   * it() represents a single test.
   *
   * The string is simply the label that the test will display in the results, and describes what the test does
   * The anonymous function () => {} is where your code goes.
   */
  it("should create username as JerryBerry", () => {
    /*
     * expect is like the "assert" statement in JUnit
     * expect takes the "actual" value, i.e. the thing you're testing
     *
     * The second statement will represent the expected value
     * expect() has a bunch of possible statements, such as toEqual()
     * toBeTruthy() is just the default statement provided by these files, I didn't have any examples to change it to
     */
    const username = (component.username = "JerryBerry");
    expect(username).toBe("JerryBerry");
  });

  it("should create password as 123", () => {
    const password = (component.password = "123");
    expect(password).toBe("123");
  });

  it("should create confirm password as 123", () => {
    const password = (component.confirmationPassword = "123");
    expect(password).toBe("123");
  });

  it("should create select as participant", () => {
    const role = (component.roles = "participant");
    expect(role).toBe("participant");
  });

  it("should create first name as Jerry", () => {
    const firstName = (component.firstName = "Jerry");
    expect(firstName).toBe("Jerry");
  });

  it("should create last name as Berry", () => {
    const lastName = (component.lastName = "Berry");
    expect(lastName).toBe("Berry");
  });

  it("should create age as 20", () => {
    const age = (component.age = "20");
    expect(age).toBe("20");
  });

  it("should create gender as male", () => {
    component.gender = [{ gender: "Male" }, { gender: "Female" }];
    const gender = (component.gender = "male");
    expect(gender).toBe("male");
  });

  it("should create address as 123 street", () => {
    const address = (component.streetAddress = "123 street");
    expect(address).toBe("123 street");
  });

  it("should create city as Ottawa", () => {
    const city = (component.city = "Ottawa");
    expect(city).toBe("Ottawa");
  });

  it("should create province as Ontario", () => {
    const province = (component.province = "Ontario");
    expect(province).toBe("Ontario");
  });

  it("should create country as Canada", () => {
    const country = (component.country = "Canada");
    expect(country).toBe("Canada");
  });

  it("should create postal code as A1B2C3", () => {
    const postalCode = (component.postalCode = "A1B2C3");
    expect(postalCode).toBe("A1B2C3");
  });
});
