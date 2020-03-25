import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/users.service';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { CodetableService } from 'src/app/services/codetable.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AvailableStudiesComponent } from './available.component';
import { QuestionnaireService } from 'src/app/services/questionnaires.service';
import { StudyService } from 'src/app/services/study.service';
import { ChatService } from 'src/app/services/chat.service';
import { DiaryService } from 'src/app/services/diary.service';
import { FindValuePipe } from 'src/app/pipes/findValue.pipe';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatTableModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

/*
 * The Describe function is just a way to group together tests 
 * I don't recommend making new Describe functions
 */
describe('AvailableStudiesComponent', () => {
  let component: AvailableStudiesComponent;
  let fixture: ComponentFixture<AvailableStudiesComponent>;

  /*
   * This beforeEach sets up the imports that we'll need  
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        //RouterTestingModule,
        FormsModule,
        MatMenuModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        FlexLayoutModule,
        MatSelectModule
      ],
      declarations: [ 
        AvailableStudiesComponent,
        FindValuePipe
       ],
      providers: [
        UserService,
        AuthService,
        CodetableService,
        ChangeDetectorRef,
        QuestionnaireService,
        StudyService,
        ChatService,
        DiaryService,
        FindValuePipe
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
    fixture = TestBed.createComponent(AvailableStudiesComponent);
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
