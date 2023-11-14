import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import BlankLayout from "../layout/blankLayout/BlankLayout";
import SheetView from "../pages/sheet/SheetView";
import NewSheet from "../pages/NewSheet";
import Jira from "../pages/Jira";

const Route = (props) => {
  const routes = useRoutes([
    // {
    //   path: '/',
    //   index: true,
    //   element: <Navigate replace to={getHomeRoute()} />
    // }
    {
      path: "/",
      element: (
        <BlankLayout>
          <SheetView />
        </BlankLayout>
      ),
    },

    {
      path: "8",
      element: (
        <BlankLayout>
          <SheetView />
        </BlankLayout>
      ),
    },
    {
      path: "/sheets/new",
      element: <NewSheet />,
    },
    {
      path: "/jira",
      element: <Jira />,
    },
  ]);

  return routes;
};

export default Route;
