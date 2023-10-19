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
import Dashboard from "@/containers/Home/Dashboard";
import CustomerList from "@/containers/Customer/List";
import ProjectList from "@/containers/Project/List";
import DutyKanban from "@/containers/Duty/Container";
import Reports from "@/containers/Reports/Reports";
import Application from "@/containers/Settings/Application/Container";
import CurrencyList from "@/containers/Settings/Currency/List";


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
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Page><Dashboard /></Page>} />
        </Route>
        <Route path="/customers" element={<ProtectedRoute />}>
          <Route path="/customers" element={<Page><CustomerList type="real" /></Page>} />
        </Route>
        <Route path="/customers/potential" element={<ProtectedRoute />}>
          <Route path="/customers/potential" element={<Page><CustomerList type="potential" /></Page>} />
        </Route>
        <Route path="/projects" element={<ProtectedRoute />}>
          <Route path="/projects" element={<Page><ProjectList /></Page>} />
          <Route path="/projects/:customerId" element={<Page><ProjectList /></Page>} />
        </Route>
        <Route path="/finance" element={<ProtectedRoute />}>
          <Route path="/finance" element={<Page>Finans sayfası geliştirme aşamasındadır</Page>} />
        </Route>
        <Route path="/reports" element={<ProtectedRoute />}>
          <Route path="/reports" element={<Page><Reports /></Page>} />
        </Route>
        <Route path="/duties" element={<ProtectedRoute />}>
          <Route path="/duties" element={<Page><DutyKanban /></Page>} />
          <Route path="/duties/:projectId" element={<Page><DutyKanban /></Page>} />
        </Route>
        <Route path="/settings" element={<ProtectedRoute />}>
          <Route path="/settings" element={<Page>Ayarlar sayfası geliştirme aşamasındadır</Page>} />
          <Route path="/settings/team" element={<Page>Ekipler sayfası geliştirme aşamasındadır</Page>} />
          <Route path="/settings/currency" element={<Page><CurrencyList /></Page>} />
          <Route path="/settings/application" element={<Page><Application /></Page>} />
        </Route>
        <Route path="/logout" element={<ProtectedRoute />}>
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
