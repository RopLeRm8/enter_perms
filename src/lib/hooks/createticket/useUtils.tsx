import { IState } from "@/types/hooks";

export default function useUtils(state: IState) {
  const calcTime = () => {
    if (!state.approvalPeriod.startDate || !state.approvalPeriod.endDate)
      return <></>;
    return (
      <>
        {Math.round(
          (new Date(state.approvalPeriod.endDate).getTime() -
            new Date(state.approvalPeriod.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1 || 1}
      </>
    );
  };

  return { calcTime };
}
