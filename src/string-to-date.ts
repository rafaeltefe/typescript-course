export default function stringToDate(date: string): Date {
  const [dayString, timeString] = date.split(" ");
  const [monthDayString, monthString, yearString] = dayString.split("/");
  const [hourString, minuteString] = timeString.split(":");
  
  const result = new Date(
    Number(yearString),
    Number(monthString) - 1,
    Number(monthDayString),
    Number(hourString),
    Number(minuteString),
    0,
    0
  );
  return result;
}
