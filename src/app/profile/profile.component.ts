import { Component, OnInit } from "@angular/core";
import { ScrumserviceService } from "./../scrumservice.service";
import { DragulaService } from "ng2-dragula";
import { Subscription } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  public arrCount = [0, 1, 2, 3];
  subs = new Subscription();
  constructor(
    private scrumservice: ScrumserviceService,
    private dragula: DragulaService,
    private http: HttpClient
  ) {
    this.dragula.createGroup("mainTable", {
      revertOnSpill: true,
      direction: "horizontal",
      invalid: el => {
        return el.id == "author" || el.id == "remove" || el.id == "blank";
      }
    });

    this.subs.add(
      this.dragula.drop("mainTable").subscribe(value => {
        console.log(value);
        var el = value["el"];
        var target = value["target"];
        var source = value["source"];

        if (target["id"] == source["id"]) {
          var offset = 0;
          for (var i = 0; i < target["children"].length; i++) {
            if (i == 0 && target["children"][i]["id"] == "author") {
              offset = 1;
              continue;
            }
            if (target["children"][i]["id"] == el["id"]) {
              console.log(i - offset);
              this.scrumservice.moveGoal(source["id"], i - offset);
              break;
            }
          }
        } else {
          this.scrumservice.changeOwner(source["id"], target["id"]);
        }
      })
    );
    this.scrumservice.username = sessionStorage.getItem("username");
    this.scrumservice.role = sessionStorage.getItem("role");
    this.scrumservice.authOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "JWT " + sessionStorage.getItem("token")
      })
    };
    this.http
      .get(
        "http://127.0.0.1:8000/scrum/api/scrumusers",
        this.scrumservice.httpOptions
      )
      .subscribe(
        data => {
          console.log(data);
          for (var i = 0; i < data["length"]; i++) {
            data[i]["scrumgoal_set"] = data[i]["scrumgoal_set"].filter(
              s => s["visible"]
            );
          }
          this.scrumservice.users = data;
        },
        err => {
          this.scrumservice.message = "Unexpected Error";
          console.log(err);
        }
      );
  }

  editGoal(event) {
    console.log(event);
    var items = event.target.innerText.split(/\)\s(.+)/);
    var goal_name = window.prompt(
      "Editing Task ID#" + items[0] + ":",
      items[1]
    );
    if (goal_name == null || goal_name == "") {
      this.scrumservice.message = "Edit Canceled.";
    } else {
      this.http
        .put(
          "http://127.0.0.1:8000/scrum/api/scrumgoals/",
          JSON.stringify({
            mode: 1,
            goal_id: items[0],
            new_name: goal_name
          }),
          this.scrumservice.authOptions
        )
        .subscribe(
          data => {
            this.scrumservice.users = data["data"];
            this.scrumservice.message = data["message"];
          },
          err => {
            console.error(err);
            if (err["status"] == 401) {
              this.scrumservice.message =
                "Session Invalid or Expired. Please login";
              this.logout();
            } else {
              this.scrumservice.message = "Unexpected Error";
            }
          }
        );
    }
  }

  doNothing() {
    console.log("Did Nothing");
  }

  ngOnInit() {}

  addGoal() {
    this.scrumservice.addGoal();
  }

  logout() {
    this.scrumservice.message = "Thank you for using scrum";
    this.scrumservice.logout();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.dragula.destroy("mainTable");
  }
}
