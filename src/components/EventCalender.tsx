import clsx from "clsx";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";
import { useMemo } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Event {
  date: Date;
  title: string;
}

interface EventCalenderProps {
  events: Event[];
}

const EventCalender = ({ events }: EventCalenderProps) => {
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  const eventsByDate = useMemo(() => {
    return events.reduce((acc: { [key: string]: Event[] }, event) => {
      const dateKey = format(event.date, "yyyy-MM-dd");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [events]);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-center text-white text-4xl font-bold">
          {format(currentDate, "MMMM yyyy")} Calender
        </h1>
      </div>

      <div className="grid grid-cols-7 gap-2 text-white w-1/2 mx-auto">
        {WEEKDAYS.map((day) => {
          return (
            <div key={day} className="font-bold text-center">
              {day}
            </div>
          );
        })}
        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return (
            <div
              key={`empty-${index}`}
              className="border rounded p-2 text-center"
            />
          );
        })}
        {daysInMonth.map((day, index) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const todaysEvents = eventsByDate[dateKey] || [];
          return (
            <div
              key={index}
              className={clsx(
                "border rounded-md  p-2 text-center cursor-pointer hover:bg-red-600 text-lg",
                {
                  "bg-gray-200": isToday(day),
                  "text-gray-950": isToday(day),
                }
              )}
            >
              {format(day, "d")}
              {todaysEvents.map((event, index) => {
                return (
                  <div
                    key={index}
                    className="text-sm font-light bg-green-500 rounded-md text-gray-950"
                  >
                    {event.title}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalender;
