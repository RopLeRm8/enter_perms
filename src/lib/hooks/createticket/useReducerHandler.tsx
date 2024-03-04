import {
  ISikumEntry,
  ISikumValue,
  IStateTransformed,
  IStep,
} from "@/types/hooks";
import { useCallback, useContext, useEffect } from "react";
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
import { useStateValue } from "@/providers/StateProvider";
import useSaveTicket from "./useSaveTicket";
import PhonelinkEraseIcon from "@mui/icons-material/PhonelinkErase";
import { FIELDLABELS } from "@/config/fieldslabels";

export default function useReducerHandler() {
  const [state, dispatch] = useStateValue();
  const notifContext = useContext(NotificationContext);
  const setNotif = notifContext.setMessage;
  const setIsError = notifContext.setIsError;
  const { saveTicket, loading, data: saveticketData } = useSaveTicket(state);
  const {
    checkId,
    checkOption,
    checkFullName,
    checkSiba,
    checkMelave,
    checkEzor,
    checkRehev,
  } = useValidate();

  const nextStep = async () => {
    if (isCurrentStep(steps.length - 1)) {
      saveTicket();
      return;
    }
    if (!isValid()) return;
    dispatch({ type: "NEXT_STEP" });
    if (isCurrentStep(findStep("requestFor")) && !isTaasia()) {
      setFieldValue("industryWorker", "");
      dispatch({ type: "NEXT_STEP" });
    } else if (isCurrentStep(findStep("vehicleEntryApproval")) && !isOto()) {
      setFieldValue("vehicleDetails", "");
      setFieldValue("nilvim", []);
      dispatch({ type: "NEXT_STEP" });
      dispatch({ type: "NEXT_STEP" });
    } else if (isCurrentStep(findStep("entryReason")) && isHayal()) {
      setFieldValue("escortDetails", "");
      dispatch({ type: "NEXT_STEP" });
    }
  };

  const previousStep = () => {
    dispatch({ type: "PREVIOUS_STEP" });

    if (isCurrentStep(findStep("classificationLevel")) && isHayal()) {
      dispatch({ type: "PREVIOUS_STEP" });
    }
    if (isCurrentStep(findStep("idNumber"))) {
      if (!isTaasia()) {
        dispatch({ type: "PREVIOUS_STEP" });
      }
    }
    if (isCurrentStep(findStep("sikum"))) {
      if (!isOto()) {
        dispatch({ type: "PREVIOUS_STEP" });
        dispatch({ type: "PREVIOUS_STEP" });
      }
    }
  };

  const isValid = (inComponent?: boolean) => {
    const currentStep = steps[state.currentStep];
    let isValid = true;
    if (currentStep.validateFn) {
      const currentValue = state[currentStep.fieldName];
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

  const findStep = (stepName: string) => {
    return steps.findIndex((step) => step.fieldName === stepName);
  };
  const isCurrentStep = (step: number) => {
    return state.currentStep == step;
  };
  const isTaasia = () => {
    return state.requestFor == "עובד תעשייה";
  };

  const isOto = () => {
    return state.vehicleEntryApproval == "כן";
  };

  const isHayal = (value?: string) => {
    const val = value ?? state.requestFor;
    return steps[0].options.findIndex((opt) => opt.optionname === val) < 3;
  };
  const setFieldValue = useCallback(
    (
      fieldPath: string,
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
        | { [key: string]: boolean }
    ) => {
      dispatch({ type: "SET_FIELD_VALUE", payload: { fieldPath, value } });
    },
    [dispatch]
  );

  const steps = [
    {
      name: "בקשה עבור",
      fieldName: "requestFor",
      label: "בקשה עבור",
      validateFn: checkOption,
      options: [
        {
          optionname: 'אע"צ',
          icon: <MilitaryTechIcon />,
        },
        {
          optionname: "קצין/נגד",
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
      label: "תעודה מזהה",
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
      name: "רמת סיווג של איזור עבודה",
      label: "רמת סיווג של איזור עבודה",
      fieldName: "workAreaClassification",
      validateFn: checkOption,
      options: [
        {
          optionname: "איזור מנהלתי",
          icon: <NoEncryptionGmailerrorredIcon />,
        },
        {
          optionname: "איזור מבצעי",
          icon: <PhonelinkEraseIcon />,
        },
        {
          optionname: "איזור הכי מסווג",
          icon: <LockPersonIcon />,
        },
      ],
    },
    {
      name: "אישור כניסה עם רכב?",
      label: "אישור כניסה ברכב",
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

  const getSikum = () => {
    const sikum: ISikumEntry[] = [];
    Object.entries(state).forEach(([key, value]: [string, ISikumEntry]) => {
      const stepName: string | undefined = steps.find(
        (step) => step.fieldName === key
      )?.label;
      if (!stepName) return;

      if (Array.isArray(value) && value.length > 0) {
        sikum.push({ [stepName]: value });
      } else if (typeof value === "object" && value !== null) {
        const labeledObject = Object.entries(value).reduce(
          (acc, [subKey, subValue]) => {
            const label: keyof typeof FIELDLABELS =
              FIELDLABELS[subKey] || subKey;
            if (subValue !== "") {
              acc[label as keyof ISikumValue] = subValue;
            }
            return acc;
          },
          {} as ISikumValue
        );

        if (Object.keys(labeledObject).length > 0) {
          sikum.push({ [stepName]: labeledObject });
        }
      } else {
        if (value !== "") {
          sikum.push({ [stepName]: value });
        }
      }
    });

    return sikum;
  };

  const handleInputChange = useCallback(
    (fieldPath: string, value: string, onlynums?: boolean): void => {
      if (!onlynums) {
        setFieldValue(fieldPath, value);
      } else if (onlynums && /^\d*$/.test(value)) {
        return setFieldValue(fieldPath, value);
      }
    },
    [setFieldValue]
  );

  const resetReducer = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  useEffect(() => {
    if (!saveticketData) return;
    setNotif("הבקשה נשלחה בהצלחה!");
    setIsError(false);
    resetReducer();
    setFieldValue("suggestionModalOpen", false);
  }, [saveticketData, setNotif, setIsError, resetReducer, setFieldValue]);

  return {
    state,
    setFieldValue,
    nextStep,
    previousStep,
    steps,
    isValid,
    isHayal,
    getSikum,
    handleInputChange,
    loading,
  };
}
