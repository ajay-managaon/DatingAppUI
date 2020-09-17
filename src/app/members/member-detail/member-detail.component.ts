import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from "ngx-gallery";
import { User } from "src/app/models/user";
import { AlertifyService } from "src/app/services/alertify.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-member-detail",
  templateUrl: "./member-detail.component.html",
  styleUrls: ["./member-detail.component.scss"],
})
export class MemberDetailComponent implements OnInit {
  user: User;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data["user"];
    });

    this.galleryOptions = [
      {
        width: "340px",
        height: "340px",
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    const photoUrls = [];
    for (const photo of this.user.photos) {
      photoUrls.push({
        small: photo.photo_url,
        medium: photo.photo_url,
        big: photo.photo_url,
        description: photo.description,
      });
    }
    return photoUrls;
  }

  //Replaced this code using Route Resolver code above, inside ngOnInit
  // loadUser() {
  //   this.userService.getUser(this.route.snapshot.params["id"]).subscribe(
  //     (user: User) => {
  //       this.user = user;
  //     },
  //     (error) => {
  //       this.alertify.error(
  //         "There was an error in getting the User. Please call Helpdesk"
  //       );
  //     }
  //   );
  // }
}
