import Profile from "@/modules/profile/pages/Profile";
import { AuthRoute } from "@/router/Route";

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
