import { useCallback, useEffect } from "react";
import { useGetData } from "../api/useGetData";

export default function useGetCars() {
  const { request, data } = useGetData<string[]>();
  const getCars = useCallback(async () => {
    await request({
      url: "api/getcars",
      method: "GET",
    });
    if (!data) return;
  }, []);
  useEffect(() => {
    getCars();
  }, [getCars]);
  return { data };
}
