import axios, { AxiosRequestConfig } from "axios";

export async function ServerPropsApi<T>(
  config: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axios(config);
    return response.data;
  } catch (err) {
    throw err;
  }
}
