import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ScrumserviceService {
  public login_username;
  public login_password;

  public message;
  public goal_name;

  public createuser_username;
  public createuser_fullname;
  public createuser_password;
  public createuser_rtpassword;
  public createuser_age;
  public createuser_usertype;

  public username;
  public password;
  public role;
  public users;

  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  authOptions: { headers: HttpHeaders };

  constructor(private http: HttpClient, private router: Router) {}

  //SIGN UP METHOD FOR CREATING NEW USER USING A POST METHOD AND SENDING A JSON RESPONSE TO THE API
  createUser() {
    this.http
      .post(
        "http://127.0.0.1:8000/scrum/api/scrumusers/",
        JSON.stringify({
          username: this.createuser_username,
          full_name: this.createuser_fullname,
          age: this.createuser_age,
          password: this.createuser_password,
          rtpassword: this.createuser_rtpassword,
          usertype: this.createuser_usertype
        }),
        this.httpOptions
      )
      .subscribe(
        data => {
          this.message = data["message"];
          this.createuser_username = "";
          this.createuser_fullname = "";
          this.createuser_age = "";
          this.createuser_password = "";
          this.createuser_rtpassword = "";
          this.createuser_usertype = "";
        },
        err => {
          this.message = "User creation failed. Unexpected error";
          console.error(err);
          this.createuser_username = "";
          this.createuser_fullname = "";
          this.createuser_age = "";
          this.createuser_password = "";
          this.createuser_rtpassword = "";
          this.createuser_usertype = "";
        }
      );
  }

  //LOGIN METHOD FOR USER LOGIN
  login() {
    this.http
      .post(
        "http://127.0.0.1:8000/scrum/api-token-auth/",
        JSON.stringify({
          username: this.login_username,
          password: this.login_password
        }),
        this.httpOptions
      )
      .subscribe(
        data => {
          this.username = this.login_username;
          this.password = this.login_password;
          this.role = data["role"];
          this.users = data["data"];
          this.message = data["message"];
          this.router.navigate(["profile"]);
          this.login_username = "";
          this.login_password = "";
          console.log(data);
          this.authOptions = {
            headers: new HttpHeaders({
              "Content-Type": "application/json",
              Authorization: "JWT " + data["token"]
            })
          };
        },
        err => {
          if (err["status"]) {
            this.message = "Login Failed: Invalid Credentials.";
          } else {
            this.message = "Login Failed: Unexpected Error!";
          }
          this.message = "Login failed. Unexpected error";
          console.error(err);
          this.username = "";
          this.password = "";
          this.role = "";
          this.login_username = "";
          this.login_password = "";
          this.createuser_usertype = "";
        }
      );
  }

  addGoal() {
    this.http
      .post(
        "http://127.0.0.1:8000/scrum/api/scrumgoals/",
        JSON.stringify({
          username: this.username,
          password: this.password,
          name: this.goal_name
        }),
        this.httpOptions
      )
      .subscribe(
        data => {
          if (data["exit"] == 0) {
            this.users = data["data"];
            this.message = data["message"];
            this.goal_name = "";
          }
        },
        err => {
          console.log(err);
          this.message = "Unexpected Error";
          this.goal_name = "";
        }
      );
  }

  logout() {
    this.username = "";
    this.password = "";
    this.role = "";
    this.users = [];
    this.message = "Thank you for using scrum";
    this.router.navigate(["login"]);
  }

  moveGoal(goal_id, to_id) {
    this.http
      .patch(
        "http://127.0.0.1:8000/scrum/api/scrumgoals/",
        JSON.stringify({
          username: this.username,
          password: this.password,
          goal_id: goal_id,
          to_id: to_id
        }),
        this.httpOptions
      )
      .subscribe(
        data => {
          if (data["exit"] == 0) {
            this.users = data["data"];
            this.message = data["message"];
          }
        },
        err => {
          console.log(err);
          this.message = "Unexpected Error";
        }
      );
  }

  changeOwner(from_id, to_id) {
    this.http
      .put(
        "http://127.0.0.1:8000/scrum/api/scrumgoals/",
        JSON.stringify({
          username: this.username,
          password: this.password,
          from_id: from_id,
          to_id: to_id
        }),
        this.httpOptions
      )
      .subscribe(
        data => {
          if (data["exit"] == 0) {
            this.users = data["data"];
            this.message = data["message"];
          }
        },
        err => {
          console.log(err);
          this.message = "Unexpected Error";
        }
      );
  }
}
