import { useCallback, useEffect } from "react";
import { useSendApiReq } from "../api/useSendApiReq";
import { ISoldier } from "@/types/api";
import useReducerHandler from "../global/useReducerHandler";

export default function useGetSoldier() {
  const { request, data, loading } = useSendApiReq<ISoldier>();
  const { setFieldValue } = useReducerHandler();
  const getSoldier = useCallback(
    async (soldierId: string) => {
      await request({
        url: "api/controllers/getsoldier",
        method: "POST",
        data: {
          soldierId,
        },
      });
    },
    [request]
  );

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) return;
    setFieldValue("escortDetails.firstName", data?.firstName);
    setFieldValue("escortDetails.lastName", data?.lastName);
    setFieldValue("escortDetails.phone", data?.phone);
  }, [data, setFieldValue]);
  return { getSoldier, loading };
}
