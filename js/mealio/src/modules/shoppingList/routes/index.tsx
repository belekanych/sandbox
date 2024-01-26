import List from "../pages/List";
import { AuthRoute } from "../../../router/Route";

export default [
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/shopping-list",
        element: <List />,
      },
    ],
  },
];
