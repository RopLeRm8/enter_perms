import { NotificationContext } from "@/contexts/NotificationContext";
import { IMessageResponse, IUseApiResponse } from "@/types/hooks";
import axios, { AxiosRequestConfig } from "axios";
import { useContext, useState } from "react";
import { useMutation } from "react-query";

export const useGetData = <T>(): IUseApiResponse<T> => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const notifContext = useContext(NotificationContext);
  const setNotif = notifContext.setMessage;
  const setIsError = notifContext.setIsError;
  const { mutate } = useMutation<T, Error, AxiosRequestConfig>(
    async (config: AxiosRequestConfig) => {
      setLoading(true);
      const response = await axios({
        ...config,
        url: config.url,
      });
      return response.data;
    },
    {
      onSuccess: (msg) => {
        setData((msg as IMessageResponse<T>).data ?? msg);
      },
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response?.data.error) {
          setNotif(`שגיאה: ${err.response.data.error}`);
        } else {
          setNotif(err.message || "בעיה בלתי צפויה קרתה");
        }
        setIsError(true);
      },
      onSettled: async () => {
        setLoading(false);
      },
    }
  );

  const request = (config: AxiosRequestConfig): void => {
    mutate(config);
  };
  return {
    data: data,
    setData: setData,
    loading: loading,
    request,
  };
};
