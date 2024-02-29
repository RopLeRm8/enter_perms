"use client";
import { IAction, IState } from "@/types/hooks";

const SET_FIELD_VALUE = "SET_FIELD_VALUE";
const NEXT_STEP = "NEXT_STEP";
const PREVIOUS_STEP = "PREVIOUS_STEP";
const RESET = "RESET";

export const INITIALSTATE: IState = {
  idNumber: "",
  fullName: {
    firstName: "",
    lastName: "",
  },
  requestFor: "",
  industryWorker: "",
  entryReason: "",
  escortDetails: {
    misparIshi: "",
    firstName: "",
    lastName: "",
    phone: "",
  },
  classificationLevel: "",
  approvalPeriod: {
    startDate: undefined,
    endDate: undefined,
  },
  workArea: "",
  vehicleEntryApproval: "",
  vehicleDetails: {
    vehicleNum: "",
    vehicleCol: "",
    vehicleType: "",
  },
  nilvim: [],
  currentStep: 0,
  modalOpen: false,
  searchValue: "",
  suggestionModalOpen: true,
  viewTickets: {
    inputValue: null,
    ticketModalOpen: false,
    openedTicket: {},
    entryCode: "",
    acceptTicket: true,
    showPag: false,
    menuEl: null,
    groupedTickets: null,
    originalTickets: null,
    sortCount: 0,
    sortSoldier: false,
    sortEzrah: false,
    expandedStatuses: {},
  },
};

export function formReducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case SET_FIELD_VALUE:
      if (action.payload) {
        const { fieldPath, value } = action.payload;
        const keys = fieldPath.split(".");
        if (keys.length > 1) {
          const [parentKey, childKey] = keys;
          return {
            ...state,
            [parentKey]: {
              ...state[parentKey],
              [childKey]: value,
            },
          };
        } else {
          return {
            ...state,
            [fieldPath]: value,
          };
        }
      }
    case NEXT_STEP:
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case PREVIOUS_STEP:
      return {
        ...state,
        currentStep: state.currentStep > 0 ? state.currentStep - 1 : 0,
      };
    case RESET:
      return INITIALSTATE;
    default:
      return state;
  }
}
