import { AxiosRequestConfig } from "axios";
import { INilve } from "./ui";
import { ChangeEvent } from "react";

interface IOptions {
  optionname: string;
  icon?: JSX.Element;
}
interface IAction {
  type: string;
  payload?: {
    fieldPath: string;
    value:
      | string
      | number
      | Date
      | INilve[]
      | boolean
      | IStateTransformed
      | Record<string, IStateTransformed[]>
      | Record<string, IStateTransformed[]>
      | null
      | HTMLButtonElement
      | { [key: string]: boolean };
  };
}
interface IStep {
  name: string;
  fieldName: string;
  label?: string;
  options: IOptions[];
  isBig?: boolean;
  isDate?: boolean;
  isRehev?: boolean;
  twoFields?: boolean;
  isMelave?: boolean;
  onlyNum?: boolean;
  isNilvim?: boolean;
  isSikum?: boolean;
  isTz?: boolean;
  validateFn?: (input: string, title?: string) => boolean;
}

interface IViewTickets {
  idInputValue: string | null;
  nameInputValue: string | null;
  ticketModalOpen: boolean;
  openedTicket: Partial<IStateTransformed>;
  entryCode: string;
  acceptTicket: boolean;
  showPag: boolean;
  menuEl: HTMLButtonElement | null;
  groupedTickets: Record<string, IStateTransformed[]> | null;
  originalTickets: Record<string, IStateTransformed[]> | null;
  sortCount: number;
  sortSoldier: boolean;
  sortEzrah: boolean;
  expandedStatuses: { [key: string]: boolean };
}
interface IState {
  [key: string]: any;
  idNumber: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  requestFor: string;
  industryWorker: string;
  entryReason: string;
  escortDetails: {
    misparIshi: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  classificationLevel: string;
  approvalPeriod: {
    startDate?: Date;
    endDate?: Date;
  };
  workArea: string;
  workAreaClassification: string;
  vehicleEntryApproval: string;
  vehicleDetails: {
    vehicleNum: string;
    vehicleCol: string;
    vehicleType: string;
  };
  nilvim: INilve[];
  currentStep: number;
  modalOpen: boolean;
  searchValue: string;
  suggestionModalOpen: boolean;
  viewTickets: IViewTickets;
}

interface IUseGetSteps {
  state: IState;
  setFieldValue: (fieldPath: string, value: string | Date) => void;
  getFieldValue: (
    field: string
  ) =>
    | string
    | number
    | Date
    | INilve[]
    | boolean
    | IStateTransformed
    | Record<string, IStateTransformed[]>
    | Record<string, IStateTransformed[]>
    | null
    | HTMLButtonElement;
  nextStep: () => void;
  previousStep: () => void;
  steps: IStep[];
  openCloseModal: () => void;
}
type ActionType =
  | { type: "SET_FIELD_VALUE"; payload: { field: string; value: string } }
  | { type: "NEXT_STEP" }
  | { type: "TWO_NEXT_STEPS" }
  | { type: "PREVIOUS_STEP" }
  | { type: "TWO_PREVIOUS_STEPS" };

interface ISikumValue {
  [key: string]: string | ISikumValue | string[] | INilve;
}

interface ISikumEntry {
  [stepName: string]: ISikumValue | string | string[];
}

type IMessageResponse<T> = { data: T };

interface IUseApiResponse<T> {
  data: T | undefined;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
  loading: boolean;
  request: (config: AxiosRequestConfig) => void;
  status: "loading" | "error" | "idle" | "success";
}
type IStateToDBMap = { [K in keyof IState]?: keyof IStateTransformed };

interface IStateTransformed {
  id?: string;
  IDPerson: string;
  HumenType: string;
  IndustryType: string;
  FirstName: string;
  LastName: string;
  EntryReason: string;
  ID_Guarantor: string;
  ClassifiedType: string;
  StartDate: string;
  EndDate: string;
  WorkArea: string;
  WorkAreaClassification: string;
  HaveCar: string | boolean;
  CarNumber: string;
  CarColor: string;
  CarManufacture: string;
  ApproveStatus: "בטיפול" | "אושר" | "לא אושר";
  ApproveCode: string;
  createdAt: Date;
  CreatorUsername: string;
}

interface IMenuItems {
  label: string;
  applyStyles: boolean;
  icon: JSX.Element;
  checkFunc?: (e: ChangeEvent<HTMLInputElement>) => void;
  clickFunc?: () => void;
  checkedValue?: boolean;
}

export type {
  IStep,
  IViewTickets,
  IState,
  ActionType,
  IUseGetSteps,
  IAction,
  ISikumValue,
  ISikumEntry,
  IMessageResponse,
  IUseApiResponse,
  IStateToDBMap,
  IStateTransformed,
  IMenuItems,
};
