import { lazy } from "react";
import { TRoute, MenuType } from "./types.ts";

export enum Path {
  Chats = "/",
  SignIn = `/sign-in`,
  SignUp = `/sign-up`,
  NotFound = "/not-found",
}

export const routes: TRoute[] = [
  {
    index: true,
    name: "Chats",
    href: Path.Chats,
    menuType: [MenuType.Main],
    Component: lazy(() => import("../pages/ChatsPage.tsx")),
  },
  {
    index: false,
    name: "Sign-In",
    href: Path.SignIn,
    menuType: [MenuType.Main],
    Component: lazy(() => import("../pages/SignInPage.tsx")),
  },
  {
    index: false,
    name: "Sign-Up",
    href: Path.SignUp,
    menuType: [MenuType.Main],
    Component: lazy(() => import("../pages/SignUpPage.tsx")),
  },
  {
    index: false,
    name: "NotFound",
    href: Path.NotFound,
    menuType: [MenuType.Main],
    Component: lazy(() => import("../pages/NotFoundPage.tsx")),
  },
];
