import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  CalendarDays,
  FileLineChart,
  Folder,
  Landmark,
  LayoutDashboard,
  Minus,
  Plus,
  UserPlus,
  Users,
} from 'lucide-react';

import React, { useState } from 'react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const sidebarItems = [
  { icon: <LayoutDashboard />, text: "Dashboard" },
  { icon: <CalendarDays />, text: "Takvim" },
  { icon: <Users />, text: "Müşteriler" },
  { icon: <UserPlus />, text: "Potansiyel Müşteriler" },
  { icon: <Folder />, text: "Projeler" },
  { icon: <Briefcase />, text: "İş Süreçleri" },
  { icon: <Landmark />, text: "Finans" },
  { icon: <Plus />, text: "Gelirler" },
  { icon: <Minus />, text: "Giderler" },
  { icon: <FileLineChart />, text: "Raporlar" },
];

export function Sidebar({ className }: SidebarProps) {
  const [activePage, setActivePage] = useState("Dashboard");

  const handlePageClick = (page: string) => {
    setActivePage(page);
  };

  return (
    <div className={cn("pb-12 absolute w-full sm:w-fit h-full left-0 bg-background top-10 border-t border-r z-50 lg:relative lg:top-0 lg:border-r-0 lg:border-t-0", className)}>
      <div className="space-y-2 py-4">
        {sidebarItems.map((item, index) => (
          <SidebarButton
            key={index}
            icon={item.icon}
            text={item.text}
            isActive={activePage === item.text}
            onClick={() => handlePageClick(item.text)}
          />
        ))}
      </div>
    </div>
  );
}

function SidebarButton({ icon, text, isActive, onClick }: { icon: React.ReactElement; text: string; isActive: boolean; onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start whitespace-nowrap ${isActive ? 'hover:bg-gray-200' : ''}`}
      onClick={onClick}
    >
      <p className={`flex items-center gap-2`} style={{ color: isActive ? "#0caca4" : "" }}>
        {icon} {text}
      </p>
    </Button>
  );
}
