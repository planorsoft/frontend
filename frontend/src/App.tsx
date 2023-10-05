import { useHealthCheck } from "@/hooks/use-health-check";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/protected-route";
import { useUnauthorizedResponseHandler } from "@/hooks/use-unauthorized-response-handler";

import Page from "@/components/page";

import NotFound from "@/containers/HttpStatuses/NotFound";
import Login from "@/containers/Identity/Login";
import Register from "@/containers/Identity/Register";
import ConfirmEmail from "@/containers/Identity/ConfirmEmail";
import Logout from "@/containers/Identity/Logout";
import Confirm from "@/containers/Identity/Confirm";
import ForgotPassword from "@/containers/Identity/ForgotPassword";
import ForgotConfirmPassword from "@/containers/Identity/ForgotConfirmPassword";
import Tenant from "@/containers/Identity/Tenant";



function UseMiddleware() {
  useUnauthorizedResponseHandler();
  useHealthCheck();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <UseMiddleware />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/forgot-confirm-password"
          element={<ForgotConfirmPassword />}
        />
        <Route path="/tenant" element={<Tenant />} />
        <Route path="/" element={<div>Home</div>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Page>dashboard</Page>} />
        </Route>
        <Route path="/customers" element={<ProtectedRoute />}>
          <Route path="/customers" element={<Page>dashboard</Page>} />
          <Route path="/customers/detail/:id" element={<Page>dashboard</Page>} />
        </Route>
        <Route path="/customers/potential" element={<ProtectedRoute />}>
          <Route path="/customers/potential" element={<Page>dashboard</Page>} />
          <Route path="/customers/potential/detail/:id" element={<Page>dashboard</Page>} />
        </Route>
        <Route path="/projects" element={<ProtectedRoute />}>
          <Route path="/projects" element={<Page>dashboard</Page>} />
        </Route>
        <Route path="/settings" element={<ProtectedRoute />}>
          <Route path="/settings" element={<Page>dashboard</Page>} />
          <Route path="/settings/currency" element={<Page>dashboard</Page>} />
          <Route path="/settings/application" element={<Page>dashboard</Page>} />
        </Route>
        <Route path="/logout" element={<ProtectedRoute />}>
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
