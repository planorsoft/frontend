import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/store";
import { ExternalLink, Info, MapPin, Pencil, Users } from "lucide-react";
import { CalendarState } from "./types";
import { selectEventById } from "./selector";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface DetailProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpsertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  eventId: number;
}

const Detail = ({ open, setOpen, setUpsertOpen, eventId }: DetailProps) => {
  const { t } = useTranslation();
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
          <DialogTitle className="flex flex-col space-y-1.5 pb-3">
            <p className="font-semibold leading-none tracking-tight">
              {event?.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {start.toLocaleString(DateTime.DATETIME_SHORT)},{" "}
              {start.toRelative()}
            </p>
          </DialogTitle>
          <div className="pt-0 grid gap-1">
            {event?.description && (
              <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
                <Info className="w-6 h-6 mt-px" />
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">{t("calendar.description")}:</p>
                  <p className="text-sm text-muted-foreground">
                    {event?.description}
                  </p>
                </div>
              </div>
            )}

            {event?.location && (
              <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
                {isUrl(event.location) ? (
                  <ExternalLink className="w-6 h-6 mt-px" />
                ) : (
                  <MapPin className="w-6 h-6 mt-px" />
                )}
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">
                  {t("calendar.location-link")}:
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {isUrl(event.location) ? (
                      <a
                        href={event.location}
                        className="flex justify-start items-center my-3"
                      >
                        <ExternalLink className="mr-2 w-4 h-4" />
                        <span>{event?.location}</span>
                      </a>
                    ) : (
                      <p>{t("calendar.location")}: {event?.location}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {event?.attendee && event.attendee.length > 0 && (
              <div className="my-3 flex items-start space-x-4 rounded-md transition-all">
                <Users className="w-6 h-6 mt-px" />
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">
                    Davetli kişiler:
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {event?.attendee.map((attendee, index) => {
                      console.log(attendee);
                      return (
                        <div key={index}>
                          <p className="text-sm text-muted-foreground">
                            <a
                              href={`mailto:${attendee.email}`}
                              className="hover:underline"
                            >
                              {attendee.email}
                            </a>
                            {attendee.name && `, ${attendee.name}`}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

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
