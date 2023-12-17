import { CalendarState, Event } from "./types";


export const selectEventById = (state: CalendarState, eventId: number) => {
    return (state.events as unknown as Event[]).find((event) => event.id === eventId);
}

export const selectEventsByMonths = (state: CalendarState, month: number) => {
    return (state.events as unknown as Event[]).filter((event) => {
        const eventDate = event.start;
        return eventDate.getMonth() === month;
    });
}

export const selectEventsByWeeks = (state: CalendarState, week: number) => {
    return (state.events as unknown as Event[]).filter((event) => {
        const eventDate = event.start;
        return getWeek(eventDate) === week;
    });
}

const getWeek = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}