import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import {
  KanbanSquare,
  LayoutDashboard,
  CalendarDays,
  Users,
  UserPlus,
  Folder,
  Landmark,
  Settings,
  Currency,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getCurrencies } from "@/containers/Settings/Currency/actions";
import { CurrencyState } from "@/containers/Settings/Currency/types";
import { checkVersion } from "@/lib/config";
import { UserState } from "@/containers/Settings/User/types";
import { getTeam } from "@/containers/Settings/User/actions";

const defaultSidebar = [
  {
    name: "Ana sayfa",
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  {
    name: "Takvim",
    icon: CalendarDays,
    to: "/calendar",
  },
  {
    name: "Müşteriler",
    icon: Users,
    to: "/customers",
  },
  {
    name: "Potansiyel müşteriler",
    icon: UserPlus,
    to: "/customers/potential",
  },
  {
    name: "Projeler",
    icon: Folder,
    to: "/projects",
  },
  {
    name: "Görevler",
    icon: KanbanSquare,
    to: "/duties",
  },
  {
    name: "Finans",
    icon: Landmark,
    to: "/finance",
  },
  /*
  {
    name: "Raporlar",
    icon: FileText,
    to: "/reports",
  },
  */
  {
    name: "Ayarlar",
    icon: Settings,
    to: "/settings",
    child: [
      {
        name: "Ekip",
        icon: Users,
        to: "/settings/team",
      },
      {
        name: "Uygulama",
        icon: Users,
        to: "/settings/application",
      },
      {
        name: "Döviz",
        icon: Currency,
        to: "/settings/currency",
      },
    ],
  },
];

const customerSidebar = [
  {
    name: "Ana sayfa",
    icon: LayoutDashboard,
    to: "/customer-panel",
  },
];

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: string;
}

export default function Page({ role, children }: PageProps) {
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
