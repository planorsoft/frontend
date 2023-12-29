import { LegacyRef, createRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions } from "@fullcalendar/core/index.js";
import { ApplicationState } from "../Settings/Application/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { CalendarState } from "./types";
import { toast } from "@/components/ui/use-toast";
import Upsert from "./Upsert";
import trLocale from "@fullcalendar/core/locales/tr";
import { getEventsByMonth } from "./actions";
import { selectEventsByMonths } from "./selector";
import { EventImpl } from "@fullcalendar/core/internal";
import { DateTime } from "luxon";
import Detail from "./Detail";
import { Loader } from "lucide-react";

const Calendar = () => {
  const dispatch = useAppDispatch();
  const applicationState = useAppSelector<ApplicationState>(
    (state) => state.applicationState
  );
  const calendarState = useAppSelector<CalendarState>(
    (state) => state.calendarState
  );
  const loading = calendarState.loading;
  const [upsert, showUpsert] = useState<boolean>(false);
  const [detail, showDetail] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [date, setDate] = useState<Date | undefined>();
  const calendarRef = createRef<FullCalendar>();

  useEffect(() => {
    if (calendarState.error) {
      toast({
        title: "Hata oluştu",
        description: calendarState.error,
        variant: "destructive",
      });
    }
  }, [calendarState.error]);

  const handleUpsert = (id: number = 0, date: Date | undefined = undefined) => {
    setId(id);
    setDate(date);
    showUpsert(true);
  };

  const handleDetail = (id: number = 0) => {
    setId(id);
    showDetail(true);
  };

  const dateClickHandler = (arg: { date: Date }) => {
    handleUpsert(0, arg.date);
  };

  const eventClickHandler = (arg: { event: unknown }) => {
    const id = (arg.event as EventImpl)._def.publicId as string;
    const eventId = parseInt(id);
    handleDetail(eventId);
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      calendarRef.current?.getApi().changeView("listWeek");
    } else {
      calendarRef.current?.getApi().changeView("dayGridMonth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentMonth =
      calendarRef.current?.getApi()?.getDate()?.getMonth() ||
      new Date().getMonth();
    const eventByMonth = selectEventsByMonths(calendarState, currentMonth);
    if (eventByMonth.length === 0) {
      dispatch(getEventsByMonth(currentMonth));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (calendarState.status === "GET_CALENDAR_EVENTS_SUCCESS") {
      calendarRef.current?.render();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarState.status]);

  useEffect(() => {
    calendarRef.current?.render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationState.sidebar]);

  const calendarOptions: CalendarOptions = {
    initialView: "dayGridMonth",
    buttonText: {
      today: "Bugün",
      month: "Ay",
      week: "Hafta",
      day: "Gün",
      list: "Liste",
    },
    firstDay: 1,
    stickyFooterScrollbar: true,
    locale: trLocale,
    height: "90vh",
    dateClick: dateClickHandler,
    eventClick: eventClickHandler,
    customButtons: {
      addEventButton: {
        text: "+ Yeni Etkinlik",
        click: function () {
          handleUpsert();
        },
      },
    },
    headerToolbar: {
      right: "today prev,next addEventButton",
    },
    events: calendarState.events.map((event) => ({
      id: event.id?.toString(),
      title: event.title,
      start: DateTime.fromSeconds(event.start).toJSDate(),
      end: event.end && DateTime.fromSeconds(event.end).toJSDate(),
      color: event.color,
      attendeeLength: event.attendee?.length,
    })),
    eventDidMount: function (arg) {
      // add icon before event title
      const icon = document.createElement("span");
      if (arg.event.extendedProps.attendeeLength > 0) {
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`;
      } else {
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock w-4 h-4"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
      }

      const title =
        arg.el.querySelector(".fc-event-title") ??
        arg.el.querySelector(".fc-list-event-title");
      title?.classList.add("flex", "flex-row", "items-center", "gap-1");
      if (title) {
        title.prepend(icon);
      }
    },
  };

  return (
    <div className="overflow-x-auto">
      {loading && <Loader className="w-8 h-8 animate-spin mx-auto mt-10" />}
      <div className={loading ? "hidden" : ""}>
        <FullCalendar
          ref={calendarRef as LegacyRef<FullCalendar>}
          plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
          {...calendarOptions}
        />
      </div>
      {detail && (
        <Detail
          open={detail}
          setOpen={showDetail}
          setUpsertOpen={showUpsert}
          eventId={id}
        />
      )}
      {upsert && (
        <Upsert open={upsert} setOpen={showUpsert} eventId={id} date={date} />
      )}
    </div>
  );
};

export default Calendar;
