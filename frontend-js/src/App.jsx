import { useEffect } from "react";
import { healthCheckWithToast } from "@/utils/healthCheck";
import { useToast } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUnauthorizedResponseHandler } from "@/utils/axiosInterceptors";

import Sidebar from "@/components/Sidebar"

import Home from "@/containers/Landing/Home";
import NotFound from "@/containers/HttpStatuses/NotFound";
import Login from "@/containers/Identity/Login";
import Register from "@/containers/Identity/Register";
import Logout from "@/containers/Identity/Logout";
import Confirm from "@/containers/Identity/Confirm";
import ForgotPassword from "@/containers/Identity/ForgotPassword";
import ForgotConfirmPassword from "@/containers/Identity/ForgotConfirmPassword";
import Tenant from "@/containers/Identity/Tenant";
import CustomerList from "@/containers/Customers/List";
import CustomerDetail from "@/containers/Customers/Detail";
import ProjectList from "@/containers/Projects/List";
import Dashboard from "@/containers/Dashboard";
import Settings from "@/containers/Settings";
import Application from "@/containers/Settings/Application/List";
import Currency from "@/containers/Settings/Currency/List";



function UseMiddleware() {
  const navigate = useNavigate();
  const toast = useToast();

  useUnauthorizedResponseHandler(navigate, toast);
  return null;
}

function App() {
  const toast = useToast();

  useEffect(() => {
    healthCheckWithToast(toast);
  }, []);

  return (
    <BrowserRouter>
      <UseMiddleware />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/forgot-confirm-password"
          element={<ForgotConfirmPassword />}
        />
        <Route path="/tenant" element={<Tenant />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Sidebar element={<Dashboard />} />} />
        </Route>
        <Route path="/customers" element={<ProtectedRoute />}>
          <Route path="/customers" element={<Sidebar element={<CustomerList isPotential={false} />} />} />
          <Route path="/customers/detail/:id" element={<Sidebar element={<CustomerDetail isPotential={false} />} />} />
        </Route>
        <Route path="/customers/potential" element={<ProtectedRoute />}>
          <Route path="/customers/potential" element={<Sidebar element={<CustomerList isPotential={true} />} />} />
          <Route path="/customers/potential/detail/:id" element={<Sidebar element={<CustomerDetail isPotential={true} />} />} />
        </Route>
        <Route path="/projects" element={<ProtectedRoute />}>
          <Route path="/projects" element={<Sidebar element={<ProjectList />} />} />
        </Route>
        <Route path="/settings" element={<ProtectedRoute />}>
          <Route path="/settings" element={<Sidebar element={<Settings />} />} />
          <Route path="/settings/currency" element={<Sidebar element={<Settings selected={Currency} />} />} />
          <Route path="/settings/application" element={<Sidebar element={<Settings selected={Application} />} />} />
        </Route>
        <Route path="/logout" element={<ProtectedRoute />}>
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
