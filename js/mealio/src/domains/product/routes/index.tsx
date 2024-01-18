import Create from "../pages/Create";
import List from "../pages/List";
import { AuthRoute } from "../../../router/Route";
import Edit from "../pages/Edit";

export default [
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/product",
        element: <List />,
      },
      {
        path: "/product/create",
        element: <Create />,
      },
      {
        path: "/product/:id",
        element: <Edit />,
      },
    ],
  },
];
