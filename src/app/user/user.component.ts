import { Component, OnInit } from "@angular/core";
import { ScrumserviceService } from "./../scrumservice.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  constructor(
    private router: Router,
    private scrumservice: ScrumserviceService
  ) {}

  ngOnInit() {}

  toLogin() {
    this.router.navigate(["login"]);
    this.scrumservice.message = "";
  }
  createUser() {
    this.scrumservice.createUser();
  }
}
