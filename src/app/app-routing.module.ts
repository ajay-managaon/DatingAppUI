import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./authguards/auth.guard";
import { HomeComponent } from "./home/home.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberListsComponent } from "./member-lists/member-lists.component";
import { MessagesComponent } from "./messages/messages.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "members", component: MemberListsComponent },
      { path: "messages", component: MessagesComponent },
      { path: "lists", component: ListsComponent },
    ],
  },
  { path: "**", redirectTo: '', pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
