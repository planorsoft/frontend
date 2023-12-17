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

const Calendar = () => {
  const dispatch = useAppDispatch();
  const applicationState = useAppSelector<ApplicationState>(
    (state) => state.applicationState
  );
  const calendarState = useAppSelector<CalendarState>(
    (state) => state.calendarState
  );
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
  }

  const dateClickHandler = (arg: { date: Date }) => {
    handleUpsert(0, arg.date);
  };

  const eventClickHandler = (arg: { event: unknown }) => {
    const eventId = parseInt((arg.event as EventImpl)._def.publicId as string);
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
    const currentMonth = (calendarRef.current?.getApi()?.getDate()?.getMonth() || new Date().getMonth());
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
    })),
  };

  return (
    <div className="overflow-x-auto">
      <FullCalendar
        ref={calendarRef as LegacyRef<FullCalendar>}
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        {...calendarOptions}
      />
      <Detail open={detail} setOpen={showDetail} setUpsertOpen={showUpsert} eventId={id} />
      <Upsert open={upsert} setOpen={showUpsert} eventId={id} date={date} />
    </div>
  );
};

export default Calendar;
