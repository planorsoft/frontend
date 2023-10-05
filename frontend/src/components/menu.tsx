import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";
import { Menu as MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  toggleSidebar: () => void;
}


export function Menu({ toggleSidebar }: MenuProps) {
  const navigate = useNavigate();

  return (
    <Menubar className="rounded-none border-b border-none flex justify-between">
      <div className="flex items-center gap-2">
        <div>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <MenuIcon />
          </Button>
        </div>
        <p>{document.title}</p>
      </div>
      <div className="flex">
        <MenubarMenu>
          <MenubarTrigger className="hidden md:block">Hesap</MenubarTrigger>
          <MenubarContent forceMount>
            <MenubarItem inset>Hesabı düzenle</MenubarItem>
            <MenubarItem inset className="text-warning" onClick={() => { navigate("/logout") }}>Çıkış yap</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <ThemeToggle />
      </div>
    </Menubar>
  );
}
