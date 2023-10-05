import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { setToken } from "@/containers/Identity/actions";
import { useAppDispatch, useAppSelector } from "@/store";
import { IdentityState } from "@/containers/Identity/types";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = useAppSelector<IdentityState>((store) => store.identity).isAuthenticated;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (token) {
    return <Outlet />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
