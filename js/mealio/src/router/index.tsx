import auth from "@/modules/auth/routes";
import landing from "@/modules/landing/routes";
import list from "@/modules/lists/routes";
import product from "@/modules/product/routes";
import profile from "@/modules/profile/routes";
import shoppingList from "@/modules/shoppingList/routes";
import uiLibrary from "@/modules/uiLibrary/routes";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  ...auth,
  ...landing,
  ...list,
  ...product,
  ...profile,
  ...shoppingList,
  ...uiLibrary,
]);
