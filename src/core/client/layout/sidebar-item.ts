import { Type } from "@angular/core";

export interface SideBarItem {
  title: string,
  factory: Type<any>
}
