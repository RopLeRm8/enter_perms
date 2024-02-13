import { INilve, IValidatorFunction } from "@/types/ui";
import useValidate from "./useValidate";
import useGetSteps from "@/lib/hooks/clientticket/useGetSteps";
import { NotificationContext } from "../../../contexts/NotificationContext";
import { useContext } from "react";

export default function useHandleModal(
  newNilve: INilve,
  setNewNilve: React.Dispatch<React.SetStateAction<INilve>>
) {
  const { state, isHayal, setFieldValue } = useGetSteps();
  const { checkOption, checkId, checkSiba } = useValidate();
  const notifContext = useContext(NotificationContext);
  const setNotif = notifContext.setMessage;
  const setIsError = notifContext.setIsError;
  const FUNCVAL: Record<string, [IValidatorFunction, string]> = {
    humanType: [checkOption, "לא צוין מהו סוג הנלווה"],
    taasiaType: [checkOption, "לא צוין מהו סוג התעשייה"],
    id: [checkId, "פרטי תעודה מזהה לא נכונים"],
    firstName: [checkSiba, "לא צוין שם פרטי"],
    lastName: [checkSiba, "לא צוין שם משפחה"],
  };

  const handleNewNilveChange = (
    field: string,
    value: string,
    onlynums?: boolean
  ) => {
    if (field === "humanType") {
      setNewNilve((prev) => ({
        ...prev,
        [field]: value,
        ["id"]:
          (isHayal(prev.humanType) && !isHayal(value)) ||
          (!isHayal(prev.humanType) && isHayal(value))
            ? ""
            : prev.id,
      }));
    }
    if (field === "humanType" && value !== "עובד תעשייה")
      return setNewNilve((prev) => ({
        ...prev,
        [field]: value,
        ["taasiaType"]: "",
      }));
    if (!onlynums) {
      setNewNilve((prev) => ({ ...prev, [field]: value }));
    }
    if (onlynums && /^\d*$/.test(value)) {
      setNewNilve((prev) => ({ ...prev, [field]: value }));
    }
  };

  const createNilve = (): INilve | undefined => {
    let isValid = true;
    Object.entries(newNilve).forEach(([key, value]) => {
      if (key in FUNCVAL && isValid) {
        const [validateFunction, errorMessage] =
          FUNCVAL[key as keyof typeof FUNCVAL];
        if (key === "taasiaType" && newNilve.humanType !== "עובד תעשייה") {
        } else {
          if (
            !validateFunction(
              value,
              key === "id" && isHayal(newNilve.humanType)
                ? "הזן מספר אישי"
                : undefined
            )
          ) {
            setNotif(errorMessage);
            setIsError(true);
            isValid = false;
          }
        }
      }
    });
    if (!isValid) return;
    setNotif("הנלווה התווסף בהצלחה!");
    setIsError(false);
    setFieldValue("nilvim", [...state.nilvim, newNilve]);
    setNewNilve({
      humanType: "",
      taasiaType: "",
      id: "",
      firstName: "",
      lastName: "",
    });
  };

  return { handleNewNilveChange, createNilve };
}