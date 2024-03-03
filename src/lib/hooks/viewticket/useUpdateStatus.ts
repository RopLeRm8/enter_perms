import { NotificationContext } from "@/contexts/NotificationContext";
import { useCallback, useContext, useEffect } from "react";
import { useSendApiReq } from "../api/useSendApiReq";
import useUtils from "./useUtils";

export default function useUpdateStatus(isAccept: boolean) {
  const notifContext = useContext(NotificationContext);
  const setNotif = notifContext.setMessage;
  const setIsError = notifContext.setIsError;
  const { request, data, loading, setData } = useSendApiReq<string>();
  const { handleGroupUpdate } = useUtils();

  const updateStatus = useCallback(
    async (id: string | undefined, entryCode: string) => {
      await request({
        url: "api/controllers/updatestatus",
        method: "POST",
        data: {
          id,
          isAccept,
          entryCode,
        },
      });
    },
    [request, isAccept]
  );

  useEffect(() => {
    if (data) {
      handleGroupUpdate(data, isAccept ? "אושר" : "לא אושר");
      setNotif(isAccept ? "הבקשה אושרה בהצלחה" : "הבקשה נדחתה בהצלחה");
      setIsError(false);
      setData(undefined);
    }
  }, [data, isAccept, handleGroupUpdate, setNotif, setIsError, setData]);

  return { updateStatus, loading };
}
