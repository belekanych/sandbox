import { GuestRoute } from "../Route";
import ErrorElement from "../../components/ErrorElement";
import Landing from "../../pages/landing/Landing";

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
