import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { setToken } from "@/containers/Identity/actions";
import { useAppDispatch, useAppSelector } from "@/store";
import { IdentityState } from "@/containers/Identity/types";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const identity = useAppSelector<IdentityState>((state) => state.identity);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setToken(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (token) {
    return <Outlet />;
  }

  return identity.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
