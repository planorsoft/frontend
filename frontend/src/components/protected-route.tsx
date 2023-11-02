import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { setToken } from "@/containers/Identity/actions";
import { useAppDispatch, useAppSelector } from "@/store";
import { IdentityState } from "@/containers/Identity/types";
import jwtDecoder from "@/lib/jwtDecoder";
import Forbidden from "@/containers/HttpStatuses/Forbidden";

const routes = [
  {
    path: "/dashboard",
    roles: ["Manager", "Employee"],
  },
  {
    path: "/customers",
    roles: ["Manager", "Employee"],
  },
  {
    path: "/projects",
    roles: ["Manager", "Employee"],
  },
  {
    path: "/finance",
    roles: ["Manager", "Employee"],
  },
  {
    path: "/reports",
    roles: ["Manager", "Employee"],
  },
  {
    path: "/duties",
    roles: ["Manager", "Employee"],
  },
  {
    path: "/settings",
    roles: ["Manager", "Employee"],
  },
  {
    path: "/customer-panel",
    roles: ["Customer"],
  }
];

interface ProtectedRouteProps extends React.HTMLAttributes<HTMLDivElement> {
  route: string;
}

const ProtectedRoute = ({ route } : ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecoder();
  const identity = useAppSelector<IdentityState>((state) => state.identity);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setToken(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (token || identity.isAuthenticated) {
    if (decodedToken) {
      if (decodedToken.exp < Date.now() / 1000) {
        return <Navigate to="/login" />;
      }
      if (routes.find((item) => item.path === route)?.roles.includes("Manager") && !decodedToken.roles.includes("Manager")) {
        return <Forbidden />;
      }
      if (routes.find((item) => item.path === route)?.roles.includes("Employee") && !(decodedToken.roles.includes("Employee") || decodedToken.roles.includes("Manager"))) {
        return <Forbidden />;
      }
      if (routes.find((item) => item.path === route)?.roles.includes("Customer") && !decodedToken.roles.includes("Customer")) {
        return <Forbidden />;
      }
    }
    return <Outlet />;
  } 

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
