import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "../_services";
import { User } from "../_models";

@Component({
  selector: "maincomponent",
  templateUrl: "./maincomponent.component.html",
  styleUrls: ["./maincomponent.component.css"],
})
export class MainComponentComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.router.navigate(["/estatistica"]);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
