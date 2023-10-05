import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setToken } from "@/containers/Identity/actions";

const ProtectedRoute = () => {
  let token = localStorage.getItem("token");
  let isAuthenticated = useSelector((store) => store.identity.isAuthenticated);

  const dispatch = useDispatch();

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
