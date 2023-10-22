import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteAvatar, updateAvatar } from "./actions";
import { Loader, Trash2 } from "lucide-react";
import { UserState } from "./types";
import { useRef } from "react";
import { profileImageGenerator } from "@/lib/profile-image";

interface UpsertImageProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpsertImage = ({ open, setOpen }: UpsertImageProps) => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const userState = useAppSelector<UserState>((state) => state.userState);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profil fotoğrafını güncelle</DialogTitle>
          <DialogDescription>
            png veya jpeg dosya formatını kullanabilirsin.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-12">
          <div className="col-span-9 flex items-center">
            <Input
              ref={ref}
              type="file"
              placeholder="Profil fotoğrafı seç"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                console.log(e);
                if (e.target.files) {
                  dispatch(updateAvatar(e.target.files[0]));
                }
              }}
            />
          </div>
          <div className="col-span-3">
            <Avatar className="h-20 w-20 mx-auto mb-2">
              <AvatarImage
                src={
                  userState.user.avatarUri ||
                  profileImageGenerator(userState.user.name)
                }
              />
              <AvatarFallback>
                <Loader className="w-8 h-8 animate-spin" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <DialogFooter className="mt-3">
          <Button
            variant="destructive"
            disabled={userState.user.avatarUri === null}
            onClick={() => {
              ref.current.value = "";
              dispatch(deleteAvatar());
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertImage;
