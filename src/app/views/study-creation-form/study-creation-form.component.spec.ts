import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCreationFormComponent } from './study-creation-form.component';

describe('StudyCreationFormComponent', () => {
  let component: StudyCreationFormComponent;
  let fixture: ComponentFixture<StudyCreationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyCreationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
