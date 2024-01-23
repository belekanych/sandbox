import { GuestRoute } from "../../../router/Route";
import ErrorElement from "../../../components/ErrorElement";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default [
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorElement />,
      },
    ],
  },
];
