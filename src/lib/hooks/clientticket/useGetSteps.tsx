import { IStep } from "@/types/hooks";
import { useReducer } from "react";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

const initialState = {
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
    name: "",
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
};
const SET_FIELD_VALUE = "SET_FIELD_VALUE";
const NEXT_STEP = "NEXT_STEP";
const PREVIOUS_STEP = "PREVIOUS_STEP";
const TWO_NEXT_STEPS = "TWO_NEXT_STEPS";
const TWO_PREVIOUS_STEP = "TWO_PREVIOUS_STEPS";
export default function useGetSteps() {
  function formReducer(state, action) {
    switch (action.type) {
      case SET_FIELD_VALUE:
        return {
          ...state,
          [action.payload.field]: action.payload.value,
        };
      case NEXT_STEP:
        return {
          ...state,
          currentStep: state.currentStep + 1,
        };
      case TWO_NEXT_STEPS:
        return {
          ...state,
          currentStep: state.currentStep + 2,
        };
      case PREVIOUS_STEP:
        return {
          ...state,
          currentStep: state.currentStep > 0 ? state.currentStep - 1 : 0,
        };
      case TWO_PREVIOUS_STEP:
        return {
          ...state,
          currentStep: state.currentStep > 0 ? state.currentStep - 2 : 0,
        };
      default:
        return state;
    }
  }

  const setFieldValue = <T,>(field: string, value: T) => {
    dispatch({ type: SET_FIELD_VALUE, payload: { field, value } });
  };

  const getFieldValue = (field: string) => {
    return state[field];
  };

  const nextStep = () => {
    if (isTaasia(2)) {
      return dispatch({ type: NEXT_STEP });
    }
    dispatch({ type: TWO_NEXT_STEPS });
  };

  const isTaasia = (step: number) => {
    return (
      (state["currentStep"] == step && getFieldValue("requestFor") == 3) ||
      state["currentStep"] != step
    );
  };

  const previousStep = () => {
    if (isTaasia(4)) {
      return dispatch({ type: PREVIOUS_STEP });
    }
    dispatch({ type: TWO_PREVIOUS_STEP });
  };
  const [state, dispatch] = useReducer(formReducer, initialState);

  const steps = [
    {
      name: "הזן תעודת זהות",
      fieldName: "idNumber",
      onlyNum: true,
    },
    {
      name: "הזן שם מלא",
      twoFields: true,
      fieldName: "fullName",
    },
    {
      name: "בקשה עבור",
      fieldName: "requestFor",
      options: [
        {
          optionname: "אזרח",
          icon: <EmojiPeopleIcon />,
        },
        {
          optionname: "קבלן",
          icon: <MapsHomeWorkIcon />,
        },
        {
          optionname: "ספק",
          icon: <LocalShippingIcon />,
        },
        {
          optionname: "עובד תעשייה",
          icon: <EngineeringIcon />,
        },
      ],
    },
    {
      name: "עובד תעשייה",
      options: [
        {
          optionname: "רפאל",
        },
        {
          optionname: "אלביט",
        },
        {
          optionname: "תעשייה אווירית",
        },
        {
          optionname: "אלתא",
        },
      ],
      fieldName: "industryWorker",
    },
    {
      name: "הזן סיבת כניסה",
      isBig: true,
      fieldName: "entryReason",
    },
    {
      name: "פרטי מלווה",
      isMelave: true,
      fieldName: "escortDetails",
    },
    {
      name: "רמת סיווג הפגישה/עבודה",
      options: [
        {
          optionname: "בלמס",
        },
        {
          optionname: "שמור",
        },
        {
          optionname: "סודי",
        },
        {
          optionname: "סודי ביותר",
        },
        {
          optionname: "סודי ביותר לשוס",
        },
      ],
      isSivug: true,
      fieldName: "classificationLevel",
    },
    {
      name: "הזן תקופת האישר",
      isDate: true,
      fieldName: "approvalPeriod",
    },
    {
      name: "איזור עבודה",
      fieldName: "workArea",
    },
    {
      name: "אישור כניסה עם רכב?",
      options: [
        {
          optionname: "כן",
          icon: <TimeToLeaveIcon />,
        },
        {
          optionname: "לא",
          icon: <DirectionsWalkIcon />,
        },
      ],
      fieldName: "vehicleEntryApproval",
    },
    {
      name: "הזן פרטי רכב",
      fieldName: "vehicleDetails",
      isRehev: true,
    },
  ] as IStep[];

  return {
    state,
    getFieldValue,
    setFieldValue,
    nextStep,
    previousStep,
    steps,
  };
}
