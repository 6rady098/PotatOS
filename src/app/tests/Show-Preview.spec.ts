import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StudySurveysComponent } from './study-surveys.component';
import { HttpClient } from '@angular/common/http';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ShowPreview ', () => {
  let fixture: ComponentFixture<StudySurveysComponent>;
  let component: TestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [ TestComponent ],
      providers: [  ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(StudySurveysComponent);
      component = fixture.componentInstance;


      it('should', async(() => {
  spyOn(component, 'ShowPreview');

  let button = fixture.debugElement.nativeElement.querySelector('button');
  button.click();
}});    });
  fixture.whenStable().then(() => {
    expect(component.ShowPreview).toHaveBeenCalled();

  }));
});
