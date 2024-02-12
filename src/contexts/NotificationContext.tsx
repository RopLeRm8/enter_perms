"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type NotificationContextType = {
  message: string | null;
  isError: boolean;
  setMessage: Dispatch<SetStateAction<string | null>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
};

export const NotificationContext = createContext<NotificationContextType>({
  message: null,
  isError: false,
  setMessage: () => {},
  setIsError: () => {},
});
