import { NotificationContext } from "@/contexts/NotificationContext";
import { useCallback, useContext, useEffect } from "react";
import { useSendApiReq } from "../api/useSendApiReq";

export default function useUpdateStatus(isAccept: boolean) {
  const notifContext = useContext(NotificationContext);
  const setNotif = notifContext.setMessage;
  const setIsError = notifContext.setIsError;
  const { request, data } = useSendApiReq();

  const updateStatus = useCallback(
    async (personId: string | undefined, entryCode: string) => {
      await request({
        url: "api/controllers/updatestatus",
        method: "POST",
        data: {
          personId,
          isAccept,
          entryCode,
        },
      });
    },
    [request, isAccept]
  );

  useEffect(() => {
    if (data) {
      setNotif(isAccept ? "הבקשה אושרה בהצלחה" : "הבקשה נדחתה בהצלחה");
      setIsError(false);
    }
  }, [data, setNotif, isAccept, setIsError]);

  return { updateStatus, data };
}
