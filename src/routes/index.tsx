import { useRoutes, Navigate } from "react-router-dom";

import Login from "views/Login/Login";
import Register from "views/Register/Register";

import { homeRoutes } from "./homeRoutes";
import { accountRoutes } from "./accountRoutes";

export const AppRoutes = () => {
  const element = useRoutes([
    { path: "/", element: <Navigate to="/home/" /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    ...homeRoutes,
    ...accountRoutes,
  ]);

  return <>{element}</>;
};
