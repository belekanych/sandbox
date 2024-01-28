import ErrorElement from "@/components/ErrorElement";
import Login from "@/modules/auth/pages/Login";
import Register from "@/modules/auth/pages/Register";
import { GuestRoute } from "@/router/Route";

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
