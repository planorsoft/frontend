import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

import Login from "@/containers/Identity/Login";
import Register from "@/containers/Identity/Register";
import Logout from "@/containers/Identity/Logout";
import Confirm from "@/containers/Identity/Confirm";
import ForgotPassword from "@/containers/Identity/ForgotPassword";
import ForgotConfirmPassword from "@/containers/Identity/ForgotConfirmPassword";
import Tenant from "@/containers/Identity/Tenant";
import CustomerList from "@/containers/Customers/List";
import ProjectList from "@/containers/Projects/List";
import Dashboard from "@/containers/Dashboard";
import NotFound from "@/containers/HttpStatuses/NotFound";
import Home from "@/containers/Landing/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-confirm-password" element={<ForgotConfirmPassword />} />
        <Route path="/tenant" element={<Tenant />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/customers" element={<ProtectedRoute />}>
          <Route path="/customers" element={<CustomerList />} />
        </Route>
        <Route path="/projects" element={<ProtectedRoute />}>
          <Route path="/projects" element={<ProjectList />} />
        </Route>
        <Route path="/logout" element={<ProtectedRoute />}>
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
