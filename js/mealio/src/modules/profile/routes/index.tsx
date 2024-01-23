import { AuthRoute } from "../../../router/Route";
import Profile from "../pages/Profile";

export default [
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
];
