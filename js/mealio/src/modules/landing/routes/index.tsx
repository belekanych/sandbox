import ErrorElement from "@/components/ErrorElement";
import Landing from "@/modules/landing/pages/Landing";
import { GuestRoute } from "@/router/Route";

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
