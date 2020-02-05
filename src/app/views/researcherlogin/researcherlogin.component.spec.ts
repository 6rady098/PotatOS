import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherloginComponent } from './researcherlogin.component';

describe('ResearcherloginComponent', () => {
  let component: ResearcherloginComponent;
  let fixture: ComponentFixture<ResearcherloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
