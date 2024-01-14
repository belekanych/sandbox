import { AuthRoute } from "../Route";
import List from "../../pages/product/List";

export default [
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/product",
        element: <List />,
      },
    ],
  },
];
