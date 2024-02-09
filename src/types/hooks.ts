import { INilve } from "./ui";

interface IOptions {
  optionname: string;
  icon?: JSX.Element;
}

interface IStep {
  name: string;
  fieldName: string;
  options: IOptions[];
  isBig?: boolean;
  isDate?: boolean;
  isRehev?: boolean;
  twoFields?: boolean;
  isMelave?: boolean;
  onlyNum?: boolean;
  isNilvim?: boolean;
  isSikum?: boolean;
}

interface IState {
  idNumber: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  requestFor: string;
  industryWorker: number;
  entryReason: string;
  escortDetails: {
    misparIshi: string;
    name: string;
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

export type { IStep, IState, ActionType, IUseGetSteps };
