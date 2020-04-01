import { Component, Input, OnInit } from '@angular/core';
import { InitPageComponent } from '../init-page.component';

@Component({
  selector: 'app-study-card',
  templateUrl: './study-card.component.html',
  styleUrls: ['./study-card.component.css']
})
export class StudyCardComponent extends InitPageComponent implements OnInit {

 
  private _studyTypes: any;
  private _listOfStudies: any;

  @Input()
  set studyTypes(studyTypes: any) {
    this._studyTypes = studyTypes;
  }

  get studyTypes(): any { return this._studyTypes}

 
  @Input() 
  set listOfStudies(listOfStudies: any) {
    this._listOfStudies = listOfStudies;
  }

  get listOfStudies(): any { return this._listOfStudies; } 

  constructor() { 
    super();
  }

  ngOnInit() {

  }

}
