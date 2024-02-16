import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import {
  KanbanSquare,
  LayoutDashboard,
  FileLineChart,
  CalendarDays,
  Users,
  UserPlus,
  Folder,
  Landmark,
  Settings,
  Currency,
  FileCheck,
  FileX,
  Languages,
  LayoutGrid,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getCurrencies } from "@/containers/Settings/Currency/actions";
import { CurrencyState } from "@/containers/Settings/Currency/types";
import { checkVersion } from "@/lib/config";
import { setSidebarInStore } from "@/containers/Settings/Application/actions";
import { UserState } from "@/containers/Settings/Team/types";
import { getTeam } from "@/containers/Settings/Team/actions";
import { useTranslation } from "react-i18next";

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: string;
}

export default function Page({ role, children }: PageProps) {
const { t } = useTranslation();
const defaultSidebar = [
  
  {
    name: `${t("sidebar.home")}`,
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  {
    name: `${t("sidebar.calendar")}`,
    icon: CalendarDays,
    to: "/calendar",
  },
  {
    name: `${t("sidebar.customer")}`,
    icon: Users,
    to: "/customers",
  },
  {
    name: `${t("sidebar.potentialCustomer")}`,
    icon: UserPlus,
    to: "/customers/potential",
  },
  {
    name: `${t("sidebar.project")}`,
    icon: Folder,
    to: "/projects",
  },
  {
    name: `${t("sidebar.task")}`,
    icon: KanbanSquare,
    to: "/duties",
  },
  {
    name: `${t("sidebar.finance")}`,
    icon: Landmark,
    to: "/finance",
    child: [
      {
        name: `${t("finance.income")}`,
        icon: FileCheck,
        to: "/finance",
      },
      {
        name: `${t("finance.expense")}`,
        icon: FileX,
        to: "/finance/outcome",
      },
      {
        name: `${t("finance.model.category")}`,
        icon: Folder,
        to: "/finance/categories",
      },
    ],
  },
  {
    name: `${t("sidebar.reports")}`,
    icon: FileLineChart,
    to: "/reports",
  },
  {
    name: `${t("sidebar.settings")}`,
    icon: Settings,
    to: "/settings",
    child: [
      {
        name: `${t("settings.team.title")}`,
        icon: Users,
        to: "/settings/team",
      },
      {
        name: `${t("settings.application.title")}`,
        icon: LayoutGrid,
        to: "/settings/application",
      },
      {
        name: `${t("settings.currency.title")}`,
        icon: Currency,
        to: "/settings/currency",
      },
      {
        name: `${t("settings.language.title")}`,
        icon: Languages,
        to: "/settings/language"
      }
    ],
  },
];

const customerSidebar = [
  {
    name: `${t("sidebar.home")}`,
    icon: LayoutDashboard,
    to: "/customer-panel",
  },
];


  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebar, setSidebar] = useState(defaultSidebar);
  const currencyState = useAppSelector<CurrencyState>(
    (state) => state.currencyState
  );
  const userState = useAppSelector<UserState>(
    (state) => state.userState 
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currencyState.currencies.length == 0) {
      dispatch(getCurrencies());
    }
    if (userState.users.length == 0) {
      dispatch(getTeam());
    }
  }, []);

  useEffect(() => {
    checkVersion();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    dispatch(setSidebarInStore(!sidebarOpen));
  };

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    if (role === "Customer") {
      setSidebar(customerSidebar);
    }
  }, []);

  return (
    <>
      <Menu toggleSidebar={toggleSidebar} />
      <div className="border-t">
        <div className="bg-background">
          <div className="grid grid-cols-12">
            <div className="hidden sm:block col-span-2">
              <Sidebar
                sidebar={sidebar}
                setSidebarOpen={setSidebarOpen}
                className={sidebarOpen ? "block" : "hidden"}
              />
            </div>
            <div className="sm:hidden block">
              <Sidebar
                sidebar={sidebar}
                setSidebarOpen={setSidebarOpen}
                className={sidebarOpen ? "block" : "hidden"}
              />
            </div>
            <div
              className={`col-span-12 h-fit p-2 ${
                sidebarOpen ? "sm:col-span-10" : ""
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
