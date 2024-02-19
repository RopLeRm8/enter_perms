import { useState, useMemo } from "react";

export default function useHandleDates() {
  const [today, setToday] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const todayInit = new Date().toISOString().split("T")[0];
  const maxTodayDate = new Date(new Date().setMonth(new Date().getMonth() + 1))
    .toISOString()
    .split("T")[0];

  const maxDate = useMemo(() => {
    const todayDate = new Date(today);
    const maxDateValue = new Date(todayDate);
    maxDateValue.setMonth(maxDateValue.getMonth() + 2);
    return maxDateValue.toISOString().split("T")[0];
  }, [today]);

  return { today, todayInit, maxDate, setToday, maxTodayDate };
}
