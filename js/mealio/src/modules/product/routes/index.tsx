import Create from "@/modules/product/pages/Create";
import Edit from "@/modules/product/pages/Edit";
import List from "@/modules/product/pages/List";
import { AuthRoute } from "@/router/Route";

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
