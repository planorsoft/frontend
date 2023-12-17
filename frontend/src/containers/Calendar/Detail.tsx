import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/store";
import { ExternalLink, Loader, Pencil } from "lucide-react";
import { CalendarState } from "./types";
import { selectEventById } from "./selector";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";

interface DetailProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpsertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  eventId: number;
}

const Detail = ({ open, setOpen, setUpsertOpen, eventId }: DetailProps) => {
  const dispatch = useAppDispatch();
  const calendarState = useAppSelector<CalendarState>(
    (state) => state.calendarState
  );
  const loading = calendarState.loading;
  const event = selectEventById(calendarState, eventId);
  const start = DateTime.fromSeconds(event?.start ?? 0).setLocale("tr");

  const isUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-screen m-2 md:w-6/12">
        <DialogHeader className="text-left">
          <DialogTitle>
            {event?.title},{" "}
            <span className="text-slate-400">{start.toRelative()}</span>
          </DialogTitle>
          <p>{event?.description}</p>
          {event?.location &&
            (isUrl(event.location) ? (
              <a
                href={event.location}
                className="flex justify-start items-center my-3"
              >
                <ExternalLink className="mr-2 w-4 h-4" />
                <span>{event?.location}</span>
              </a>
            ) : (
              <p>Konum: {event?.location}</p>
            ))}
          <div className="flex justify-end">
            <Button
              variant="default"
              className="col-span-2"
              onClick={() => {
                setUpsertOpen(true);
                setOpen(false);
              }}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Detail;
