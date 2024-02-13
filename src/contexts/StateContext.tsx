"use client";

import { IAction, IState } from "@/types/hooks";
import { createContext } from "react";

const StateContext = createContext<
  [IState, React.Dispatch<IAction>] | undefined
>(undefined);

export default StateContext;
