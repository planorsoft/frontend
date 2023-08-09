import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { setToken } from "@/containers/Identity/actions";

import Login from "@/containers/Identity/Login";
import Register from "@/containers/Identity/Register";
import Logout from "@/containers/Identity/Logout";
import Confirm from "@/containers/Identity/Confirm";
import ForgotPassword from "@/containers/Identity/ForgotPassword";
import ForgotConfirmPassword from "@/containers/Identity/ForgotConfirmPassword";
import CustomerList from "@/containers/Customers/List";
import Dashboard from "@/containers/Dashboard";
import NotFound from '@/containers/HttpStatuses/NotFound';
import Home from "@/containers/Landing/Home";


function App() {
  const dispatch = useDispatch();
  const identity = useSelector((state) => state.identity);

  useEffect(() => {
    dispatch(setToken());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let Route = null;

  if (identity.isAuthenticated) {
    Route = () =>
      useRoutes([
        { path: "*", element: <NotFound /> },
        { path: "/", element: <Dashboard /> },
        { path: "/customers", element: <CustomerList /> },
        { path: "/logout", element: <Logout /> },
      ]);
  } else {
    Route = () =>
      useRoutes([
        { path: "*", element: <NotFound /> },
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/confirm", element: <Confirm /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/forgot-confirm-password", element: <ForgotConfirmPassword /> },
      ]);
  }

  return (
    <>
      <Router>
        <Route />
      </Router>
    </>
  );
}

export default App;