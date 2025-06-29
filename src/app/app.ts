import { Component } from "@angular/core";
import { Periodic } from "./periodic/periodic";

@Component({
  selector: "app-root",
  imports: [Periodic],
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
})
export class App {
  protected title = "mat-table-task";
}
