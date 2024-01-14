import { AuthRoute } from "../Route";
import Dashboard from "../../pages/dashboard/Dashboard";

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
