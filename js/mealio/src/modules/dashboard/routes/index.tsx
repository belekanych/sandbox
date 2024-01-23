import { AuthRoute } from "../../../router/Route";
import Dashboard from "../pages/Dashboard";

export default [
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
];
