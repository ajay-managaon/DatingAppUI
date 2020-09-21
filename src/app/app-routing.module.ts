import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./authguards/auth.guard";
import { PreventNavigation } from './authguards/prevent-navigation';
import { HomeComponent } from "./home/home.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { MemberListsComponent } from "./members/member-lists/member-lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { MemberDetailResolver } from "./resolver/member-detail.resolver";
import { MemberEditResolver } from "./resolver/member-edit.resolver";
import { MemberListResolver } from "./resolver/member-list.resolver";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "members",
        component: MemberListsComponent,
        resolve: { users: MemberListResolver },
      },
      {
        path: "members/:id",
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver },
      },
      {
        path: "member/edit",
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate:[PreventNavigation]
      },
      { path: "messages", component: MessagesComponent },
      { path: "lists", component: ListsComponent },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
