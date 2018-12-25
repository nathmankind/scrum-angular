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
  public role;
  public users;
  public authOptions;

  public httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  // authOptions: { headers: HttpHeaders };

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
          sessionStorage.setItem("username", this.login_username);
          sessionStorage.setItem("role", data["role"]);
          sessionStorage.setItem("token", data["token"]);
          this.username = this.login_username;
          this.role = data["role"];
          this.message = "Welcome";
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
          if (err["status"] == 400) {
            this.message = "Login Failed: Invalid Credentials.";
          } else {
            this.message = "Login Failed: Unexpected Error!";
          }
          console.error(err);
          this.login_username = "";
          this.login_password = "";
        }
      );
  }

  addGoal() {
    this.http
      .post(
        "http://127.0.0.1:8000/scrum/api/scrumgoals/",
        JSON.stringify({
          name: this.goal_name
        }),
        this.authOptions
      )
      .subscribe(
        data => {
          this.users = data["data"];
          this.message = data["message"];
          this.goal_name = "";
        },
        err => {
          console.log(err);
          if (err["status"] == 401) {
            this.message = "Session Invalid or Expired. Please login";
            this.logout();
          } else {
            this.message = "Unexpected Error";
          }
          this.goal_name = "";
        }
      );
  }

  logout() {
    this.username = "";
    this.role = "";
    this.users = [];
    this.router.navigate(["login"]);
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
  }

  moveGoal(goal_id, to_id) {
    this.http
      .patch(
        "http://127.0.0.1:8000/scrum/api/scrumgoals/",
        JSON.stringify({
          goal_id: goal_id,
          to_id: to_id
        }),
        this.authOptions
      )
      .subscribe(
        data => {
          this.users = data["data"];
          this.message = data["message"];
        },
        err => {
          console.log(err);
          if (err["status"] == 401) {
            this.message = "Session Invalid or Expired. Please login";
            this.logout();
          } else {
            this.message = "Unexpected Error";
          }
        }
      );
  }

  changeOwner(from_id, to_id) {
    this.http
      .put(
        "http://127.0.0.1:8000/scrum/api/scrumgoals/",
        JSON.stringify({
          mode: 0,
          from_id: from_id,
          to_id: to_id
        }),
        this.authOptions
      )
      .subscribe(
        data => {
          this.users = data["data"];
          this.message = data["message"];
        },
        err => {
          console.error(err);
          if (err["status"] == 401) {
            this.message = "Session Invalid or Expired. Please login";
            this.logout();
          } else {
            this.message = "Unexpected Error";
          }
        }
      );
  }
}
