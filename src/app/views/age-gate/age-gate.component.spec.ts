import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeGateComponent } from './age-gate.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AgeGateComponent', () => {
  let component: AgeGateComponent;
  let fixture: ComponentFixture<AgeGateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeGateComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
