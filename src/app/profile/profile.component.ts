import { Component, OnInit } from "@angular/core";
import { ScrumserviceService } from "./../scrumservice.service";
import { DragulaService } from "ng2-dragula";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  public arrCount = [0, 1, 2, 3];
  constructor(
    private scrumservice: ScrumserviceService,
    private dragula: DragulaService
  ) {
    this.dragula.createGroup("mainTable", {
      revertOnSpill: true,
      direction: "horizontal",
      invalid: el => {
        return el.id == "author" || el.id == "4" || el.id == "blank";
      }
    });
  }

  ngOnInit() {}

  addGoal() {
    this.scrumservice.addGoal();
  }

  logout() {
    this.scrumservice.logout();
  }

  ngOnDestroy() {
    this.dragula.destroy("mainTable");
  }
}
