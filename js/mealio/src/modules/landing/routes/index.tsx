import { GuestRoute } from "../../../router/Route";
import ErrorElement from "../../../components/ErrorElement";
import Landing from "../pages/Landing";

export default [
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/",
        element: <Landing />,
        errorElement: <ErrorElement />,
      },
    ],
  },
];
