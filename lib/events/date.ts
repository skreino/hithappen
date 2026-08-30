import { addDays, format, isSameDay, isWithinInterval, nextFriday, nextSunday, set } from "date-fns";
import { it } from "date-fns/locale";

export function createRelativeDate(daysFromToday: number, hour: number, minute = 0) {
  const target = addDays(new Date(), daysFromToday);
  return set(target, { hours: hour, minutes: minute, seconds: 0, milliseconds: 0 }).toISOString();
}
export function isToday(value: string, now = new Date()) {
  return isSameDay(new Date(value), now);
}

export function isTomorrow(value: string, now = new Date()) {
  return isSameDay(new Date(value), addDays(now, 1));
}

export function isThisWeekend(value: string, now = new Date()) {
  const day = now.getDay();
  const friday = day === 5 ? now : day === 6 || day === 0 ? addDays(now, -(day === 6 ? 1 : 2)) : nextFriday(now);
  const sunday = day === 0 ? now : nextSunday(friday);
  return isWithinInterval(new Date(value), { start: set(friday, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }), end: set(sunday, { hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }) });
}

export function isUpcoming(value: string, now = new Date()) {
  return new Date(value).getTime() >= now.getTime() - 1000 * 60 * 60 * 3;
}

export function formatEventDate(value: string, now = new Date()) {
  if (isToday(value, now)) return "Oggi";
  if (isTomorrow(value, now)) return "Domani";
  return format(new Date(value), "EEE d MMM", { locale: it });
}

export function formatEventTime(value: string) {
  return format(new Date(value), "HH:mm", { locale: it });
}

export function formatRelativeEventTime(value: string, now = new Date()) {
  return `${formatEventDate(value, now)} · ${formatEventTime(value)}`;
}
