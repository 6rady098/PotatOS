import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySurveysComponent } from './study-surveys.component';

describe('StudySurveysComponent', () => {
  let component: StudySurveysComponent;
  let fixture: ComponentFixture<StudySurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudySurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
