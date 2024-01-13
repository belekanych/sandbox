import ErrorElement from "../components/ErrorElement";
import auth from "./routes/auth";
import uiLibrary from "./routes/uiLibrary";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: `<h1>Test</h1>`,
    errorElement: <ErrorElement />,
  },
  ...auth,
  ...uiLibrary,
]);
