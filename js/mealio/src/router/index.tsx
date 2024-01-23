import auth from "../modules/auth/routes";
import dashboard from "../modules/dashboard/routes";
import landing from "../modules/landing/routes";
import product from "../modules/product/routes";
import uiLibrary from "../modules/uiLibrary/routes";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  ...landing,
  ...auth,
  ...uiLibrary,
  ...dashboard,
  ...product,
]);
