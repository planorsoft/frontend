import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { setToken } from "@/containers/Identity/actions";
import { useAppDispatch, useAppSelector } from "@/store";
import { IdentityState } from "@/containers/Identity/types";

const ProtectedRoute = () => {
  const [storageToken, setStorageToken] = useState<string | null>(null);
  const identity = useAppSelector<IdentityState>((state) => state.identity);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setStorageToken(token);
    dispatch(setToken(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (storageToken) {
    return <Outlet />;
  }

  return identity.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
