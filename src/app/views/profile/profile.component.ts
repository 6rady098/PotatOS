import { Component, OnInit, OnDestroy } from "@angular/core";
import { InitPageComponent } from "../init-page.component";
import { CodetableService } from "src/app/services/codetable.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent extends InitPageComponent
  implements OnInit, OnDestroy {
  roles: any;
  sex: any;
  studyTypes: any;
  model: User;
  entryFlag: boolean;
  editEntryFlag: boolean;

  constructor(private codetableService: CodetableService) {
    super();
  }

  ngOnInit() {
    this.initializeOnLoad();

    this.codetableService.getData().subscribe(res => {
      this.roles = res[0]["roles"];
      this.sex = res[0]["sex"];
      this.studyTypes = res[0]["studyTypes"];
    });
  }

  initializeOnLoad() {
    this.roles = [];
    this.sex = [];
    this.studyTypes = [];
    this.entryFlag = false;
    this.editEntryFlag = false;
  }

  close() {
    this.entryFlag = false;
    this.editEntryFlag = false;
  }

  getStaticMap(address: string): string {
    address = address
      .replace(/\s/g, "")
      .replace(/\./g, "")
      .replace(/\,/g, "");

    const URLP1 = "https://maps.googleapis.com/maps/api/staticmap?center=";
    const URLP2 = "&size=600x200&zoom=12&markers=size:mid%7Ccolor:red%7C";
    const URLP3 = "&key=AIzaSyA5ob8CsoU0t3h_jkAdAkUN9HnHRG0ZVzA";

    return URLP1 + address + URLP2 + address + URLP3;
  }

  ngOnDestroy() {}

  editEntry(user) {
    this.model = user;
    this.editEntryFlag = true;
  }

  /*edit() {
    if (this.model.age === undefined) {
      this.model.age = 0;
    }

    const id = this.model._id;
    delete this.model._id;

    this.userService.update(this.model, id).subscribe(res => {
      if (res.status === 200) {
        this.refreshData();
        this.close();
      }
    });
  }*/
}
