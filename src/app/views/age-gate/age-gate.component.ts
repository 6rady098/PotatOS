import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users.service';
import { InitPageComponent } from '../init-page.component';
import { AuthService } from 'src/app/auth/auth.service';
import { CodetableService } from 'src/app/services/codetable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-age-gate',
  templateUrl: './age-gate.component.html',
  styleUrls: ['./age-gate.component.css']
})
export class AgeGateComponent extends InitPageComponent implements OnInit, OnDestroy, AfterViewChecked {
  birthdate: Date;
  age: number;

  CalculateAge(): void {
    if (this.birthdate) {
      var timeDiff = Math.abs(Date.now() - new Date(this.birthdate).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      if(this.age < 18){
        alert("User is under 18. Access denied!");
      }else{
        this.router.navigateByUrl('/login');
      }
  }
}

  constructor(private router: Router) {
    super();
  }

  ngOnInit() {

  }

  ngAfterViewChecked(){

  }

  ngOnDestroy(){}
}
