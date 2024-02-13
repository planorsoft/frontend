import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { InputSelect } from "@/components/ui/input-select";
import InputString from "@/components/ui/input-string";
import Loader from "@/components/ui/loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Attendee, CalendarState } from "./types";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectEventById } from "./selector";
import { createEvent, getEvent, updateEvent } from "./actions";
import InputDateTime from "@/components/ui/input-date-time";
import InputTextarea from "@/components/ui/input-textarea";
import Remove from "@/components/remove";
import { DateTime } from "luxon";
import { InputServerMultiSelect } from "@/components/ui/input-server-multiselect";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  id: z.number().optional(),
  title: z.string().nonempty({
    message: "Lütfen geçerli bir başlık giriniz.",
  }),
  description: z.string().optional(),
  start: z.date().nullish(),
  end: z.date().nullish(),
  location: z.string().optional(),
  color: z.string().optional(),
  attendee: z.array(z.string()).optional(),
});

interface UpsertProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  eventId: number;
  date: Date | undefined;
}

const Upsert = ({ open, setOpen, eventId, date }: UpsertProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const calendarState = useAppSelector<CalendarState>(
    (state) => state.calendarState
  );
  const loading = calendarState.loading;
  const event = selectEventById(calendarState, eventId);

  const [remove, setRemove] = useState<boolean>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      title: "",
      description: "",
      start: undefined,
      end: undefined,
      location: "",
      color: "blue",
      attendee: [],
    },
  });

  useEffect(() => {
    form.reset();
    if (eventId === 0) {
      form.setValue("start", date ? new Date(date) : undefined);
      return;
    }
    if (!event) {
      dispatch(getEvent(eventId));
    } else if (event.id !== eventId) {
      dispatch(getEvent(eventId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  useEffect(() => {
    if (event) {
      form.setValue("id", event.id || 0);
      form.setValue("title", event.title || "");
      form.setValue("description", event.description || "");
      form.setValue(
        "start",
        event.start ? DateTime.fromSeconds(event.start).toJSDate() : undefined
      );
      form.setValue(
        "end",
        event.end ? DateTime.fromSeconds(event.end).toJSDate() : undefined
      );
      form.setValue("location", event.location || "");
      form.setValue("color", event.color || "blue");
      form.setValue(
        "attendee",
        event.attendee?.map((attendee: Attendee) => attendee.email) || []
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (remove) return;
    if (!values.start) {
      form.setError("start", {
        type: "manual",
        message: `${t("calendar.start_date_required")}`,
      });
      return;
    }
    if (values.end) {
      if (values.start > values.end) {
        form.setError("end", {
          type: "manual",
          message: `${t("calendar.end_date_must_be_after_start_date")}`,
        });
        return;
      }
    }

    const request = {
      ...values,
      start: values.start
        ? DateTime.fromJSDate(values.start).toUnixInteger()
        : DateTime.now().toUnixInteger(),
      end: values.end
        ? DateTime.fromJSDate(values.end).toUnixInteger()
        : undefined,
    };

    if (values.id == 0) {
      dispatch(createEvent(request));
    } else {
      dispatch(updateEvent(eventId, request));
    }
    setOpen(false);
  };

  const onDeleted = () => {
    setRemove(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-screen m-2 md:w-6/12">
        <DialogHeader>
          <DialogTitle>
            {eventId === 0 ? `${t("calendar.addEvent")}` : `${t("calendar.editEvent")}`}
          </DialogTitle>
          {loading ? (
            <Loader />
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <InputString
                  control={form.control}
                  placeholder= {t("calendar.title")}
                  fieldName="title"
                />
                <InputTextarea
                  control={form.control}
                  placeholder= {t("calendar.description")}
                  fieldName="description"
                />
                <InputString
                  control={form.control}
                  placeholder= {t("calendar.location-link")}
                  fieldName="location"
                />
                <InputDateTime
                  control={form.control}
                  placeholder= {t("calendar.start-date")}
                  fieldName="start"
                />
                <InputDateTime
                  control={form.control}
                  placeholder= {t("calendar.end-date")}
                  fieldName="end"
                  disabledDate={form.watch("start")}
                />
                <InputServerMultiSelect
                  control={form.control}
                  placeholder= {t("calendar.attendee")}
                  fieldName="attendee"
                  entity="attendee"
                />
                <InputSelect
                  control={form.control}
                  placeholder="Renk"
                  fieldName="color"
                  selectList={[
                    { label: `${t("calendar.orange")}`, value: "orange" },
                    { label: `${t("calendar.blue")}`, value: "blue" },
                    { label: `${t("calendar.green")}`, value: "green" },
                    { label: `${t("calendar.yelllow")}`, value: "yellow" },
                    { label: `${t("calendar.red")}`, value: "red" },
                    { label: `${t("calendar.purple")}`, value: "purple" },
                  ]}
                />

                <div className="grid grid-cols-12 gap-2">
                  <Button
                    disabled={loading}
                    type="submit"
                    className="col-span-10"
                  >
                    {loading && (
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {t("common.submit")}
                  </Button>
                  <Button
                    disabled={loading}
                    onClick={() => {
                      setRemove(true);
                    }}
                    variant="destructive"
                    className="col-span-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </DialogHeader>
      </DialogContent>
      <Remove
        open={remove}
        setOpen={setRemove}
        entity="event"
        entityId={eventId}
        onDeleted={onDeleted}
      />
    </Dialog>
  );
};

export default Upsert;
