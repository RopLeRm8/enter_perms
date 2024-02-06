export default function useHandleDates() {
  const today = new Date();
  const todayFormat = today.toISOString().split("T")[0];
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 2);
  const maxDateFormat = maxDate.toISOString().split("T")[0];

  return { todayFormat, maxDateFormat };
}
