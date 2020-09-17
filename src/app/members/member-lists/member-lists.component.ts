import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: "app-member-lists",
  templateUrl: "./member-lists.component.html",
  styleUrls: ["./member-lists.component.scss"],
})
export class MemberListsComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.users = data['users'];
    });
  }

  // loadUsers() {
  //   this.userService.getUsers().subscribe((users : User[]) => {
  //     this.users = users;
  //   }, (error) => {
  //       this.alertifyService.error("An Error occured while processing your request");
  //   });
  // }
}
