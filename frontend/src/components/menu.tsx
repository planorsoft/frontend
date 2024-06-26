import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";
import { Loader, Menu as MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { ApplicationState } from "@/containers/Settings/Application/types";
import { useEffect } from "react";
import { getCurrentApplication } from "@/containers/Settings/Application/actions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { profileImageGenerator } from "@/lib/profile-image";
import jwtDecoder from "@/lib/jwtDecoder";
import { CurrentUserState } from "@/containers/Settings/User/types";
import { getCurrentUser } from "@/containers/Settings/User/actions";
import { useTranslation } from "react-i18next";

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  toggleSidebar: () => void;
}

export function Menu({ toggleSidebar }: MenuProps) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const applicationState = useAppSelector<ApplicationState>(
    (state) => state.applicationState
  );
  const currentUserState = useAppSelector<CurrentUserState>(
    (state) => state.currentUserState
  );
  const decodedToken = jwtDecoder();

  useEffect(() => {
    if (Object.keys(applicationState.application).length <= 0) {
      dispatch(getCurrentApplication());
    }
    if (currentUserState.user.email === "") {
      dispatch(getCurrentUser());
    }
  }, []);

  return (
    <Menubar className="rounded-none border-b border-none flex justify-between h-10">
      <div className="flex items-center gap-2">
        <div>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <MenuIcon />
          </Button>
        </div>
        {Object.keys(applicationState.application).length > 0 ? (
          <p>{applicationState.application.name}</p>
        ) : (
          <p>{document.title}</p>
        )}
      </div>
      <div className="flex">
        <MenubarMenu>
          <MenubarTrigger className="items-center gap-2">
            {currentUserState.user.email === "" ? (
              "Account"
            ) : (
              <>
                <Avatar className="h-7 w-7 max-[320px]:hidden">
                  <AvatarImage
                    src={
                      currentUserState.user.avatarUri ||
                      profileImageGenerator(currentUserState.user.name)
                    }
                  />
                  <AvatarFallback>
                    <Loader className="w-8 h-8 animate-spin" />
                  </AvatarFallback>
                </Avatar>
                {currentUserState.user.name}
              </>
            )}
          </MenubarTrigger>
          <MenubarContent forceMount>
            {!decodedToken.roles.includes("Customer") && (
              <MenubarItem
                inset
                onClick={() => {
                  navigate("/settings/users/me");
                }}
              >
                {t("sidebar.editAccount")}
              </MenubarItem>
            )}
            <MenubarItem
              inset
              className="text-warning"
              onClick={() => {
                navigate("/logout");
              }}
            >
              {t("sidebar.logout")}
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <ThemeToggle />
      </div>
    </Menubar>
  );
}
