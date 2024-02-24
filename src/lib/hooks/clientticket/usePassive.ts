import { useEffect } from "react";
import useReducerHandler from "../../global/useReducerHandler";
import useHandleDates from "./useHandleDates";

export default function usePassive(open: boolean) {
  const { state, nextStep, setFieldValue } = useReducerHandler();
  const { today } = useHandleDates();
  useEffect(() => {
    const handleNextStep = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        nextStep();
      }
    };

    if (open) {
      window.removeEventListener("keydown", handleNextStep);
      return;
    }
    window.addEventListener("keydown", handleNextStep);

    return () => {
      window.removeEventListener("keydown", handleNextStep);
    };
  }, [nextStep, open]);

  useEffect(() => {
    if (!state.approvalPeriod.startDate || !state.approvalPeriod.endDate) {
      setFieldValue("approvalPeriod.startDate", today);
      setFieldValue("approvalPeriod.endDate", today);
    }
  }, [state.approvalPeriod, setFieldValue, today]);
}
