import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import PageLayout from "../layout/PageLayout";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Summary from "../pages/Summary";
import PrivateRoute from "./Guard/PrivateRoute";
import PublicRoute from "./Guard/PublicRoute";
import Login from "../pages/Login";
import Patient from "../pages/Patient";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    errorElement: <NotFound />,
    children: [
      {
        element: <PageLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },

          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/summary",
            element: <Summary />,
          },
          {
            path: "/patient",
            element: <Patient />,
          },
        ],
      },
    ],
  },
]);

export default router;
