import { INilve } from "./ui";

interface IOptions {
  optionname: string;
  icon?: JSX.Element;
}
interface IAction {
  type: string;
  payload?: { fieldPath: string; value: string | INilve[] | Date };
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
  vehicleEntryApproval: string;
  vehicleDetails: {
    vehicleNum: string;
    vehicleCol: string;
    vehicleType: string;
  };
  nilvim: INilve[];
  currentStep: number;
  modalOpen: boolean;
}

interface IUseGetSteps {
  state: IState;
  setFieldValue: (fieldPath: string, value: string | Date | any[]) => void;
  getFieldValue: (field: string) => any;
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

export type {
  IStep,
  IState,
  ActionType,
  IUseGetSteps,
  IAction,
  ISikumValue,
  ISikumEntry,
};
