/**
 * This component was intended to control the creation of radiogroup type questions,
 * but it turns out that the checkbox-form worked just as well.
 * 
 * You can feel free to delete this, I didn't bother as it would entail updating
 * some of our reports, updating other files, etc.
 * 
 * @author Frederic Joly
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radiogroup-form',
  templateUrl: './radiogroup-form.component.html',
  styleUrls: ['./radiogroup-form.component.css']
})
export class RadiogroupFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
