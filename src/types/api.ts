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

export type { ICars, ISoldier, ISaveTicketData };
