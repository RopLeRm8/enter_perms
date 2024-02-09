import { useState, useEffect } from "react";

export default function useHandleDates() {
  const [today, setToday] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [maxDate, setMaxDate] = useState<string>("");

  useEffect(() => {
    const todayDate = new Date(today);
    const maxDateValue = new Date(todayDate);
    maxDateValue.setMonth(maxDateValue.getMonth() + 2);
    setMaxDate(maxDateValue.toISOString().split("T")[0]);
  }, [today]);

  return { today, maxDate, setToday };
}
