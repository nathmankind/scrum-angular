import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ScrumserviceService } from "../scrumservice.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private scrumservice: ScrumserviceService
  ) {}

  ngOnInit() {}

  toLogin() {
    this.router.navigate(["login"]);
  }

  toUser() {
    this.router.navigate(["createuser"]);
  }
}
