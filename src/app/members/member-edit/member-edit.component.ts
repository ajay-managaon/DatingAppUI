import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/models/user";
import { AlertifyService } from "src/app/services/alertify.service";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"],
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild("editForm", { static: true }) editForm: NgForm;
  @HostListener("window:beforeunload", ["$event"])
  handleBeforeUnload($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data["user"];
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        (next) => {
          this.alertify.success("Profile updated!");
          this.editForm.reset(this.user);
        },
        (error) => {
          this.alertify.error(
            "Profile update was not successful! Please call helpdesk"
          );
        }
      );
  }
}
