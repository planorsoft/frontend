import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { KanbanSquare, LayoutDashboard, CalendarDays, Users, UserPlus, Folder, Landmark, FileText, Settings } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const sidebar = [
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
    {
      name: "Raporlar",
      icon: FileText,
      to: "/reports",
    },
    {
      name: "Ayarlar",
      icon: Settings,
      to: "/settings",
    }
  ];

  return (
    <div
      className={cn(
        "pb-12 absolute w-full sm:w-fit h-screen left-0 bg-background top-10 border-t border-r z-50 lg:relative lg:top-0 lg:border-t-0",
        className
      )}
    >
      <div className="space-y-2 p-2">
        {sidebar.map((item, index) => (
          <Button
            key={index}
            variant={location.pathname === item.to ? "secondary" : "ghost"}
            className="w-full justify-start whitespace-nowrap"
            onClick={() => { navigate(item.to) }}
          >
            <p className="flex items-center gap-2 ">
              <item.icon className="w-5" />
              {item.name}
            </p>
          </Button>
        ))}
      </div>
    </div>
  );
}
