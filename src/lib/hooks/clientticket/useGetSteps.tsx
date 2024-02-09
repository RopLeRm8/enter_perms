import { ActionType, IState, IStep } from "@/types/hooks";
import { useReducer } from "react";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import NoEncryptionGmailerrorredIcon from "@mui/icons-material/NoEncryptionGmailerrorred";
import KeyIcon from "@mui/icons-material/Key";
import HttpsIcon from "@mui/icons-material/Https";
import PasswordIcon from "@mui/icons-material/Password";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

const initialState = {
  idNumber: "",
  fullName: {
    firstName: "",
    lastName: "",
  },
  requestFor: "",
  industryWorker: -1,
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
  modalOpen: false,
};
const SET_FIELD_VALUE = "SET_FIELD_VALUE";
const NEXT_STEP = "NEXT_STEP";
const PREVIOUS_STEP = "PREVIOUS_STEP";
const OPEN_MODAL = "OPEN_MODAL";
export default function useGetSteps() {
  function formReducer(state: any, action: any) {
    switch (action.type) {
      case SET_FIELD_VALUE:
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
      case OPEN_MODAL:
        return {
          ...state,
          modalOpen: !state.modalOpen,
        };
      default:
        return state;
    }
  }

  const setFieldValue = (fieldPath: string, value: string | Date | any[]) => {
    dispatch({ type: SET_FIELD_VALUE, payload: { fieldPath, value } });
  };
  const getFieldValue = (field: string) => {
    return state[field];
  };

  const openCloseModal = () => {
    dispatch({ type: OPEN_MODAL });
  };

  const nextStep = () => {
    dispatch({ type: NEXT_STEP });
    if (isCurrentStep(0)) {
      if (!isTaasia()) {
        dispatch({ type: NEXT_STEP });
      }
    }
    if (isCurrentStep(9)) {
      if (!isOto()) {
        dispatch({ type: NEXT_STEP });
        dispatch({ type: NEXT_STEP });
      }
    }
    if (isCurrentStep(4)) {
      if (isHayal()) {
        dispatch({ type: NEXT_STEP });
      }
    }
  };
  const isCurrentStep = (step: number) => {
    return state["currentStep"] == step;
  };
  const isTaasia = () => {
    return getFieldValue("requestFor") == 6;
  };

  const isOto = () => {
    return getFieldValue("vehicleEntryApproval") == 0;
  };

  const isHayal = () => {
    return state["requestFor"] < 3;
  };

  const previousStep = () => {
    dispatch({ type: PREVIOUS_STEP });
    if (isCurrentStep(2)) {
      if (!isTaasia()) {
        dispatch({ type: PREVIOUS_STEP });
      }
    }
    if (isCurrentStep(10)) {
      if (!isOto()) {
        dispatch({ type: PREVIOUS_STEP });
        dispatch({ type: PREVIOUS_STEP });
      }
    }
  };
  const [state, dispatch] = useReducer(formReducer, initialState);

  const steps = [
    {
      name: "בקשה עבור",
      fieldName: "requestFor",
      options: [
        {
          optionname: "חייל סדיר",
          icon: <MilitaryTechIcon />,
        },
        {
          optionname: "איש קבע",
          icon: <PlayLessonIcon />,
        },
        {
          optionname: "מילואים",
          icon: <QueryBuilderIcon />,
        },
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
          icon: <NoEncryptionGmailerrorredIcon />,
        },
        {
          optionname: "שמור",
          icon: <KeyIcon />,
        },
        {
          optionname: "סודי",
          icon: <PasswordIcon />,
        },
        {
          optionname: "סודי ביותר",
          icon: <HttpsIcon />,
        },
        {
          optionname: "סודי ביותר לשוס",
          icon: <LockPersonIcon />,
        },
      ],
      fieldName: "classificationLevel",
    },
    {
      name: "הזן תקופת האישור",
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
    {
      name: "במידה ויש נלווים, נא הוסף אותם",
      fieldName: "nilvim",
      isNilvim: true,
    },
    {
      name: "סיכום מלא",
      fieldName: "sikum",
      isSikum: true,
    },
  ] as IStep[];

  return {
    state,
    setFieldValue,
    getFieldValue,
    nextStep,
    previousStep,
    steps,
    openCloseModal,
  };
}
