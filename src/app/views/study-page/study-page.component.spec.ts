import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPageComponent } from './study-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StudyService } from 'src/app/services/study.service';
import { CodetableService } from 'src/app/services/codetable.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('StudyPageComponent', () => {
  let component: StudyPageComponent;
  let fixture: ComponentFixture<StudyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyPageComponent ],
      providers: [
        StudyService,
        CodetableService,
       
      HttpClient,
      HttpHandler
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyPageComponent);
    component = fixture.componentInstance;
    component.type = 0;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
