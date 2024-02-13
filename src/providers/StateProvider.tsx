"use client";
import StateContext from "@/contexts/StateContext";
import { IAction, IState } from "@/types/hooks";
import { ReactNode, useContext, useReducer } from "react";

export const StateProvider: React.FC<{
  reducer: (state: IState, action: IAction) => IState;
  initialState: IState;
  children: ReactNode;
}> = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = (): [IState, React.Dispatch<IAction>] => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStateValue must be used within a StateProvider");
  }
  return context as [IState, React.Dispatch<IAction>];
};
