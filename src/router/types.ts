import { LazyExoticComponent } from "react";
import { Path } from "./routes";

export enum MenuType {
  Main = "Main",
  Secondary = "Secondary",
}

export type TRoute = {
  index: boolean;
  name: string;
  href: Path;
  menuType: MenuType[];
  Component: LazyExoticComponent<React.FC>;
};
