import Edit from "@/modules/lists/pages/Edit";
import { AuthRoute } from "@/router/Route";

export default [
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/lists/:id",
        element: <Edit />,
      },
    ],
  },
];
