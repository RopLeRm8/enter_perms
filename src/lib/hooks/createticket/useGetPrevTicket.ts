import { useCallback } from "react";
import { useSendApiReq } from "../api/useSendApiReq";
import { IStateTransformed } from "@/types/hooks";
import useReducerHandler from "./useReducerHandler";
import { STATETODB } from "@/config/statetodb";
import useGetSoldier from "./useGetSoldier";

export default function useGetPrevTicket() {
  const { request, data } = useSendApiReq<IStateTransformed>();
  const { setFieldValue } = useReducerHandler();
  const { getSoldier } = useGetSoldier();
  const getPreviousTicket = useCallback(
    async (idNumber: string, isHayal: boolean) => {
      await request({
        url: "api/controllers/getticket",
        method: "POST",
        data: {
          idNumber,
          isHayal,
        },
      });
    },
    [request]
  );

  const setupStates = useCallback(
    (ticketData: IStateTransformed | undefined) => {
      if (!ticketData) return;
      Object.entries(ticketData).map((val) => {
        Object.entries(STATETODB).map(([key, value]) => {
          if (value === val[0]) {
            setFieldValue(key, val[1]);
          }
          if (val[0] === "HaveCar" && value === "HaveCar")
            setFieldValue(key, val[1].data[0] === 1 ? "כן" : "לא");
        });
        if (val[0] === "ID_Guarantor") {
          getSoldier(val[1]);
        }
      });
    },
    []
  );

  return { setupStates, getPreviousTicket, data };
}
