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
export type { ICars, ISoldier, ISaveTicketData, IRequestRecord };
