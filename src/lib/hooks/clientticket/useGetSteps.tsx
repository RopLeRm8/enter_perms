import { IAction, IState, IStep } from "@/types/hooks";
import { useContext, useReducer } from "react";
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
import useValidate from "./useValidate";
import { INilve } from "@/types/ui";
import { NotificationContext } from "@/contexts/NotificationContext";

const initialState: IState = {
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
};

const SET_FIELD_VALUE = "SET_FIELD_VALUE";
const NEXT_STEP = "NEXT_STEP";
const PREVIOUS_STEP = "PREVIOUS_STEP";
const OPEN_MODAL = "OPEN_MODAL";

export default function useGetSteps() {
  const notifContext = useContext(NotificationContext);
  const setNotif = notifContext.setMessage;
  const setIsError = notifContext.setIsError;
  const {
    checkId,
    checkOption,
    checkFullName,
    checkSiba,
    checkMelave,
    checkEzor,
    checkRehev,
  } = useValidate();

  function formReducer(state: IState, action: IAction): IState {
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
      case OPEN_MODAL:
        return {
          ...state,
          modalOpen: !state.modalOpen,
        };
      default:
        return state;
    }
  }

  const nextStep = () => {
    if (!isValid()) return;
    dispatch({ type: NEXT_STEP });
    if (isCurrentStep(0) && !isTaasia()) {
      setFieldValue("industryWorker", "");
      dispatch({ type: NEXT_STEP });
    } else if (isCurrentStep(9) && !isOto()) {
      setFieldValue("vehicleDetails", "");
      dispatch({ type: NEXT_STEP });
      dispatch({ type: NEXT_STEP });
    } else if (isCurrentStep(4) && isHayal()) {
      setFieldValue("escortDetails", "");
      dispatch({ type: NEXT_STEP });
    }
  };

  const previousStep = () => {
    dispatch({ type: PREVIOUS_STEP });

    if (isCurrentStep(6) && isHayal()) {
      dispatch({ type: PREVIOUS_STEP });
    }
    if (isCurrentStep(2)) {
      if (!isTaasia()) {
        dispatch({ type: PREVIOUS_STEP });
      }
    }
    if (isCurrentStep(12)) {
      if (!isOto()) {
        dispatch({ type: PREVIOUS_STEP });
        dispatch({ type: PREVIOUS_STEP });
      }
    }
  };

  const isValid = (inComponent?: boolean) => {
    const currentStep = steps[state.currentStep];
    let isValid = true;
    if (currentStep.validateFn) {
      const currentValue = getFieldValue(currentStep.fieldName);
      if (isHayal() && state.currentStep == 2) {
        isValid = currentStep.validateFn(currentValue, "הזן מספר אישי");
      } else isValid = currentStep.validateFn(currentValue);

      if (!isValid) {
        if (!inComponent) {
          setNotif("נא הקלד מידע תקין");
          setIsError(true);
        }
        return false;
      }
    }
    return true;
  };
  const isCurrentStep = (step: number): boolean => {
    return state.currentStep == step;
  };
  const isTaasia = (): boolean => {
    return getFieldValue("requestFor") == "עובד תעשייה";
  };

  const isOto = (): boolean => {
    return getFieldValue("vehicleEntryApproval") == "כן";
  };

  const isHayal = (value?: string): boolean => {
    const val = value ?? state.requestFor;
    return steps[0].options.findIndex((opt) => opt.optionname === val) < 3;
  };
  const setFieldValue = (
    fieldPath: string,
    value: string | Date | INilve[]
  ) => {
    dispatch({ type: SET_FIELD_VALUE, payload: { fieldPath, value } });
  };
  const getFieldValue = (field: string) => {
    return state[field];
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const steps = [
    {
      name: "בקשה עבור",
      fieldName: "requestFor",
      label: "בקשה עבור",
      validateFn: checkOption,
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
      label: "עובד תעשייה",
      validateFn: checkOption,
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
      label: "תעודת זהות",
      fieldName: "idNumber",
      isTz: true,
      onlyNum: true,
      validateFn: checkId,
    },
    {
      name: "הזן שם מלא",
      label: "שם מלא",
      twoFields: true,
      fieldName: "fullName",
      validateFn: checkFullName,
    },
    {
      name: "הזן סיבת כניסה",
      label: "סיבת כניסה",
      isBig: true,
      fieldName: "entryReason",
      validateFn: checkSiba,
    },
    {
      name: "פרטי מלווה",
      label: "פרטי מלווה",
      isMelave: true,
      fieldName: "escortDetails",
      validateFn: checkMelave,
    },
    {
      name: "רמת סיווג הפגישה/עבודה",
      label: "רמת סיווג הפגישה/עבודה",
      validateFn: checkOption,
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
      label: "תקופת אישור",
      isDate: true,
      fieldName: "approvalPeriod",
    },
    {
      name: "איזור עבודה",
      label: "איזור עבודה",
      fieldName: "workArea",
      validateFn: checkEzor,
    },
    {
      name: "אישור כניסה עם רכב?",
      label: "אישור כניסה ברכ",
      validateFn: checkOption,
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
      label: "פרטי רכב",
      fieldName: "vehicleDetails",
      isRehev: true,
      validateFn: checkRehev,
    },
    {
      name: "במידה ויש נלווים, נא הוסף אותם",
      label: "נלווים",
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
    isValid,
    isHayal,
  };
}
