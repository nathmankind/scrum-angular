import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ScrumserviceService } from "./../scrumservice.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private scrumservice: ScrumserviceService
  ) {}

  ngOnInit() {}

  toUser() {
    this.router.navigate(["createuser"]);
    this.scrumservice.message = "";
  }
  login() {
    this.scrumservice.login();
  }
}
