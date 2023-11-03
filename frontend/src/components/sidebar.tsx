import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideIcon } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: (
    | {
        name: string;
        icon: LucideIcon;
        to: string;
        child?: undefined;
      }
    | {
        name: string;
        icon: LucideIcon;
        to: string;
        child: {
          name: string;
          icon: LucideIcon;
          to: string;
        }[];
      }
  )[];
  setSidebarOpen: (value: boolean) => void;
}

export function Sidebar({ sidebar, setSidebarOpen, className }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateHandler = (to : string) => {
    navigate(to);
    if (window.innerWidth < 640) {
      setSidebarOpen(false);
    }
  }

  return (
    <div
      className={cn(
        "pb-12 absolute w-full sm:w-fit h-screen left-0 bg-background top-10 border-t border-r z-50 sm:relative sm:top-0 sm:border-t-0",
        className
      )}
    >
      <div className="space-y-2 p-2">
        {sidebar.map((item, index) => {
          if (item.child) {
            return (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger className="inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start whitespace-nowrap gap-2">
                  <item.icon className="w-5" />
                  {item.name}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-screen sm:w-8/12 ml-5">
                  {item.child.map((child, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => {
                        navigateHandler(child.to);
                      }}
                      className="inline-flex w-full items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 justify-start whitespace-nowrap gap-2"
                    >
                      <child.icon className="w-5" />
                      {child.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          } else {
            return (
              <Button
                key={index}
                variant={location.pathname === item.to ? "secondary" : "ghost"}
                className="w-full justify-start whitespace-nowrap"
                onClick={() => {
                  navigateHandler(item.to);
                }}
              >
                <p className="flex items-center gap-2">
                  <item.icon className="w-5" />
                  {item.name}
                </p>
              </Button>
            );
          }
        })}
      </div>
    </div>
  );
}
