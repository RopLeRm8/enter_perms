import { IState } from "@/types/hooks";
import { useSendApiReq } from "../api/useSendApiReq";

const stateToDB: { [key: keyof IState]: string } = {
  idNumber: "IDPerson",
  requestFor: "HumenType",
  industryWorker: "IndustryType",
  "fullName.firstName": "FirstName",
  "fullName.lastName": "LastName",
  entryReason: "EntryReason",
  "escortDetails.misparIshi": "ID_Guarantor",
  classificationLevel: "ClassifiedType",
  "approvalPeriod.startDate": "StartDate",
  "approvalPeriod.endDate": "EndDate",
  workArea: "WorkArea",
  vehicleEntryApproval: "HaveCar",
  "vehicleDetails.vehicleNum": "CarNumber",
  "vehicleDetails.vehicleCol": "CarColor",
  "vehicleDetails.vehicleType": "CarManufacture",
};

function transformStateWithNestedPaths(
  state: IState,
  keyMap: typeof stateToDB
) {
  const result: Record<string, IState | boolean> = {};
  Object.entries(keyMap).forEach(([key, newValue]) => {
    let valueAtPath: IState | boolean = key
      .split(".")
      .reduce((acc, part) => acc && acc[part], state);
    if (valueAtPath) {
      if (newValue === "HaveCar") {
        valueAtPath =
          typeof valueAtPath === "string" && valueAtPath === "לא"
            ? false
            : true;
      }
      result[newValue] = valueAtPath;
    }
  });

  return result;
}

export default function useSaveTicket(state: IState) {
  const { request, loading } = useSendApiReq();
  const saveTicket = async () => {
    const dbData = transformStateWithNestedPaths(state, stateToDB);
    await request({
      url: "api/controllers/saveticket",
      method: "POST",
      data: {
        dbData,
      },
    });
  };
  return { saveTicket, loading };
}
