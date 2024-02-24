import React from "react";
import { IStateTransformed } from "./hooks";

interface IAddModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface INilve {
  humanType: string;
  taasiaType: string;
  id: string;
  firstName: string;
  lastName: string;
}

type IValidatorFunction = (input: string, title?: string) => boolean;

interface ITicketsView {
  tickets: IStateTransformed[];
  error: string;
}

interface ITicketModal {
  ticket: Partial<IStateTransformed> | undefined;
  open: boolean;
  entryCode: string | null;
  tickets: Record<string, IStateTransformed[]> | null;
}

export type {
  IAddModal,
  INilve,
  IValidatorFunction,
  ITicketsView,
  ITicketModal,
};
