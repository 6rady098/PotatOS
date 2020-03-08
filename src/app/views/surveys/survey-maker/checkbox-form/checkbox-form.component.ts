import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Checkbox } from 'src/app/models/survey-models/checkbox';
import { Choice } from 'src/app/models/survey-models/choice';

@Component({
  selector: 'checkbox-form',
  templateUrl: './checkbox-form.component.html',
  styleUrls: ['./checkbox-form.component.css']
})
export class CheckboxFormComponent implements OnInit {

  @Input() element: Checkbox;
  choices: Choice[];

  constructor() {

  }

  ngOnInit() {
    console.log('Initializing the value of the choices array');
    this.choices = this.element.refChoices;
  }

  public addItem(): void {
    this.choices.push(new Choice('Option ' + (this.choices.length + 1)));
  }

  public removeItem(index: number): void {
    this.element.removeChoiceByIndex(index);
    console.log(this.choices);
  }

  public save() {
    this.choices = [...this.choices];
  }
}
