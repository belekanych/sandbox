import auth from "./routes/auth";
import dashboard from "./routes/dashboard";
import landing from "./routes/landing";
import product from "../domains/product/routes";
import uiLibrary from "./routes/uiLibrary";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  ...landing,
  ...auth,
  ...uiLibrary,
  ...dashboard,
  ...product,
]);
