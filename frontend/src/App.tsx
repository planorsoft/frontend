import { useHealthCheck } from "@/hooks/use-health-check";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/protected-route";
import { useUnauthorizedResponseHandler } from "@/hooks/use-unauthorized-response-handler";

import Page from "@/components/page";

import NotFound from "@/containers/HttpStatuses/NotFound";
import Login from "@/containers/Identity/Login";
import Register from "@/containers/Identity/Register";
import ConfirmEmail from "@/containers/Identity/ConfirmEmail";
import Logout from "@/containers/Identity/Logout";
import ForgotPassword from "@/containers/Identity/ForgotPassword";
import ForgotConfirmPassword from "@/containers/Identity/ForgotConfirmPassword";
import Dashboard from "@/containers/Home/Dashboard";
import CustomerList from "@/containers/Customer";
import ProjectList from "@/containers/Project";
import DutyKanban from "@/containers/Duty/Container";
import Reports from "@/containers/Reports/Reports";
import Application from "@/containers/Settings/Application/Container";
import CurrencyList from "@/containers/Settings/Currency/List";
import User from "@/containers/Settings/User/Detail";
import Team from "@/containers/Settings/Team";
import Language from "@/containers/Settings/Language";
import useDevelopmentMessage from "./hooks/use-development-message";
import CustomerPanel from "@/containers/CustomerPanel";
import Calendar from "@/containers/Calendar";
import Finance from "@/containers/Finance/List";
import FinanceCategory from "@/containers/Finance/CategoryList";

import { useTranslation } from "react-i18next";



function UseMiddleware() {
  useUnauthorizedResponseHandler();
  useHealthCheck();
  useDevelopmentMessage();
  return null;
}

function App() {

  //const { i18n } = useTranslation();
  //i18n.changeLanguage('tr');

  return (
    <BrowserRouter>
      <UseMiddleware />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/forgot-confirm-password"
          element={<ForgotConfirmPassword />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<ProtectedRoute route="/dashboard" />}>
          <Route path="/dashboard" element={<Page><Dashboard /></Page>} />
        </Route>
        <Route path="/calendar" element={<ProtectedRoute route="/calendar" />}>
          <Route path="/calendar" element={<Page><Calendar /></Page>} />
        </Route>
        <Route path="/customers" element={<ProtectedRoute route="/customers" />}>
          <Route path="/customers" element={<Page><CustomerList type="real" /></Page>} />
        </Route>
        <Route path="/customers/potential" element={<ProtectedRoute  route="/customers" />}>
          <Route path="/customers/potential" element={<Page><CustomerList type="potential" /></Page>} />
        </Route>
        <Route path="/projects" element={<ProtectedRoute route="/projects" />}>
          <Route path="/projects" element={<Page><ProjectList /></Page>} />
          <Route path="/projects/:customerId" element={<Page><ProjectList /></Page>} />
        </Route>
        <Route path="/finance" element={<ProtectedRoute route="/finance" />}>
          <Route path="/finance" element={<Page><Finance type="income" /></Page>} />
        </Route>
        <Route path="/finance/outcome" element={<ProtectedRoute route="/finance" />}>
          <Route path="/finance/outcome" element={<Page><Finance type="outcome" /></Page>} />
        </Route>
        <Route path="/finance/categories" element={<ProtectedRoute route="/finance" />}>
          <Route path="/finance/categories" element={<Page><FinanceCategory /></Page>} />
        </Route>
        <Route path="/reports" element={<ProtectedRoute route="/reports" />}>
          <Route path="/reports" element={<Page><Reports /></Page>} />
        </Route>
        <Route path="/duties" element={<ProtectedRoute route="/duties" />}>
          <Route path="/duties" element={<Page><DutyKanban /></Page>} />
          <Route path="/duties/:projectId" element={<Page><DutyKanban /></Page>} />
        </Route>
        <Route path="/settings" element={<ProtectedRoute route="/settings" />}>
          <Route path="/settings" element={<Page>Ayarlar sayfası geliştirme aşamasındadır</Page>} />
          <Route path="/settings/team" element={<Page><Team /></Page>} />
          <Route path="/settings/currency" element={<Page><CurrencyList /></Page>} />
          <Route path="/settings/application" element={<Page><Application /></Page>} />
          <Route path="/settings/users/me" element={<Page><User /></Page>} />
          <Route path="/settings/language" element={<Page><Language /></Page>} />
        </Route>
        <Route path="/customer-panel" element={<ProtectedRoute route="/customer-panel" />}>
          <Route path="/customer-panel" element={<Page role="Customer"><CustomerPanel /></Page>} />
        </Route>
        <Route path="/logout" element={<ProtectedRoute route="/logout" />}>
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
