import { NotificationContext } from "@/contexts/NotificationContext";
import { IMessageResponse, IUseApiResponse } from "@/types/hooks";
import axios, { AxiosRequestConfig } from "axios";
import Router from "next/router";
import { useContext, useState } from "react";
import { useMutation } from "react-query";

export const useSendApiReq = <T>(): IUseApiResponse<T> => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const notifContext = useContext(NotificationContext);
  const setNotif = notifContext.setMessage;
  const setIsError = notifContext.setIsError;
  const { mutate, status } = useMutation(
    async (config: AxiosRequestConfig) => {
      setLoading(true);
      setData(undefined);
      const response = await axios({
        ...config,
        url: config.url,
      });
      return response.data;
    },
    {
      onSuccess: (msg: T | undefined): void => {
        setData((msg as IMessageResponse<T>).data);
      },
      onError: (err: Error): void => {
        if (!axios.isAxiosError(err)) return;
        if (err.response) {
          setNotif(`שגיאה: ${err.response.data.error}`);
          Router.push({
            pathname: "/error",
            query: {
              status: err.response.status,
              text: err.response.data.error,
            },
          });
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
    status: status,
  };
};
