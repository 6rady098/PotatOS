import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/users.service';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { CodetableService } from 'src/app/services/codetable.service';
import { FindValuePipe } from 'src/app/pipes/findValue.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

/*
 * The Describe function is just a way to group together tests 
 * I don't recommend making new Describe functions
 */
describe('LoginComponent', () => {
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
      declarations: [ 
        LoginComponent
       ],
      providers: [
        UserService,
        AuthService,
        CodetableService,
        ChangeDetectorRef
      ],
      schemas: [ NO_ERRORS_SCHEMA ] //This schema is absolutely necessary, otherwise you get a ton of errors
    })
    .compileComponents();
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
  it('should create', () => {

    /*
     * expect is like the "assert" statement in JUnit
     * expect takes the "actual" value, i.e. the thing you're testing
     * 
     * The second statement will represent the expected value
     * expect() has a bunch of possible statements, such as toEqual()
     * toBeTruthy() is just the default statement provided by these files, I didn't have any examples to change it to
     */
    expect(component).toBeTruthy();
  });

});
