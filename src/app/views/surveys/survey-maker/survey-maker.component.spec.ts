import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMakerComponent } from './survey-maker.component';

describe('SurveyMakerComponent', () => {
  let component: SurveyMakerComponent;
  let fixture: ComponentFixture<SurveyMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
