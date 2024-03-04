import { IStateTransformed } from "./hooks";

interface ICars {
  englishName: string;
  hebrewName: string;
}

interface ISoldier {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
}

type ISaveTicketData = {
  dbData: IStateTransformed;
  nilvim: IStateTransformed[];
};

interface IRequestRecord {
  count: number;
  startTime: number;
}

interface ISoldierId {
  soldierId: string;
}

interface IGetTicket {
  idNumber: string;
  isHayal: boolean;
}

interface IUpdateStatus {
  id: string;
  isAccept: boolean;
  entryCode: string;
}

export type {
  ICars,
  ISoldier,
  ISaveTicketData,
  IRequestRecord,
  ISoldierId,
  IGetTicket,
  IUpdateStatus,
};
