import { useCallback, useEffect } from "react";
import { useSendApiReq } from "../api/useSendApiReq";
import { ICars } from "@/types/api";

export default function useGetCars() {
  const { request, data } = useSendApiReq<ICars[]>();
  const getCars = useCallback(async () => {
    await request({
      url: "api/getcars",
      method: "GET",
    });
  }, []);
  useEffect(() => {
    getCars();
  }, [getCars]);
  return { data };
}
