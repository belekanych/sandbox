import { GuestRoute } from "../Route";
import ErrorElement from "../../components/ErrorElement";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";

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
