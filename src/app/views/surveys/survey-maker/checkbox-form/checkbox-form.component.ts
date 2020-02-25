import { Component, OnInit, Input, Output } from '@angular/core';
import { Survey, IElement, Question } from 'survey-angular';

@Component({
  selector: 'checkbox-form',
  templateUrl: './checkbox-form.component.html',
  styleUrls: ['./checkbox-form.component.css']
})
export class CheckboxFormComponent implements OnInit {

  @Input()
  @Output()
  public element: any;
  private readonly limit = 2;

  constructor() {

  }

  ngOnInit() {
    this.element.choices = [];

    for(let i = 0; i < this.limit; i++) {
      this.addItem();
    }
  }

  public addItem(): void {
    let choices = this.element.choices;
    this.element.choices.push('item' + choices.length);
  }

  public removeItem(): void {
    let choices = this.element.choices;
    if(choices.length > 1) {
      choices.pop();
    }
  }

}
