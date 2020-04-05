import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryFormComponent } from './diary-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DiaryFormComponent', () => {
  let component: DiaryFormComponent;
  let fixture: ComponentFixture<DiaryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryFormComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
