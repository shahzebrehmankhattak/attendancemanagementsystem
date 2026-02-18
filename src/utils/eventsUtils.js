import dayjs from 'dayjs';
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

export const getUpcomingEvents = (events) => {
  const today = dayjs().startOf("day");

  return Object.entries(events)
    .map(([date, titles]) =>
      titles.map(title => ({
        date,
        title,
      }))
    )
    .flat()
    .filter(event => dayjs(event.date).isSameOrAfter(today))
    .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
};