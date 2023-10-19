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
import { useAppDispatch, useAppSelector } from "@/store";
import { ApplicationState } from "@/containers/Settings/Application/types";
import { useEffect } from "react";
import { getCurrentApplication } from "@/containers/Settings/Application/actions";

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  toggleSidebar: () => void;
}

export function Menu({ toggleSidebar }: MenuProps) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const applicationState = useAppSelector<ApplicationState>(
    (state) => state.applicationState
  );

  useEffect(() => {
    if (Object.keys(applicationState.application).length <= 0) {
      dispatch(getCurrentApplication());
    }
  }, []);

  return (
    <Menubar className="rounded-none border-b border-none flex justify-between">
      <div className="flex items-center gap-2">
        <div>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <MenuIcon />
          </Button>
        </div>
        {Object.keys(applicationState.application).length > 0 ? (
          <p>{applicationState.application?.name} {applicationState.title}</p>
        ) : (
          <p>{document.title}</p>
        )}
      </div>
      <div className="flex">
        <MenubarMenu>
          <MenubarTrigger className="hidden md:block">Hesap</MenubarTrigger>
          <MenubarContent forceMount>
            <MenubarItem inset>Hesabı düzenle</MenubarItem>
            <MenubarItem
              inset
              className="text-warning"
              onClick={() => {
                navigate("/logout");
              }}
            >
              Çıkış yap
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <ThemeToggle />
      </div>
    </Menubar>
  );
}
