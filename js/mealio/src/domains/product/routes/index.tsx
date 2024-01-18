import Create from "../pages/Create";
import List from "../pages/List";
import { AuthRoute } from "../../../router/Route";
import Edit from "../pages/Edit";

export default [
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/products",
        element: <List />,
      },
      {
        path: "/products/create",
        element: <Create />,
      },
      {
        path: "/products/:id",
        element: <Edit />,
      },
    ],
  },
];
