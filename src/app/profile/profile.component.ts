import { Component, OnInit } from "@angular/core";
import { ScrumserviceService } from "./../scrumservice.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  public arrCount = [0, 1, 2, 3];
  constructor(private scrumservice: ScrumserviceService) {}

  ngOnInit() {}

  addGoal() {
    this.scrumservice.addGoal();
  }

  logout() {
    this.scrumservice.logout();
  }
}
