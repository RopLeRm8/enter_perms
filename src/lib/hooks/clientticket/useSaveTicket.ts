import { IState, IStateTransformed, IStateToDBMap } from "@/types/hooks";
import { useSendApiReq } from "../api/useSendApiReq";
import { INilve } from "@/types/ui";

const STATETODB: IStateToDBMap = {
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
  keyMap: IStateToDBMap
): IStateTransformed {
  const result: Partial<IStateTransformed> = {};
  Object.entries(keyMap).forEach(([key, newValue]) => {
    const valueAtPath = key
      .split(".")
      .reduce((acc: any, part) => acc && acc[part], state);
    if (valueAtPath !== undefined) {
      if (newValue === "HaveCar") {
        result[newValue] = valueAtPath === "לא" ? "false" : "true";
      } else {
        result[newValue as keyof IStateTransformed] = valueAtPath;
      }
    }
  });

  return result as IStateTransformed;
}

function saveNilvim(
  state: IState,
  dbData: IStateTransformed
): Partial<IStateTransformed>[] {
  const initialState = dbData;
  const nilveList: Partial<IStateTransformed>[] = [];
  state.nilvim.forEach((nilve: INilve) => {
    const nNilve = {
      ...(initialState as Partial<IStateTransformed>),
      IDPerson: nilve.id,
      FirstName: nilve.firstName,
      LastName: nilve.lastName,
      HumenType: nilve.humanType,
      IndustryType: nilve.taasiaType,
      HaveCar: false,
      CarNumber: "",
      CarColor: "",
      CarManufacture: "",
    };
    nilveList.push(nNilve);
  });
  return nilveList;
}

export default function useSaveTicket(state: IState) {
  const { data, request, loading } = useSendApiReq<string>();
  const dbData = transformStateWithNestedPaths({ ...state }, STATETODB);
  const nilvim = saveNilvim({ ...state }, dbData);
  const saveTicket = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await request({
          url: "api/controllers/saveticket",
          method: "POST",
          data: {
            dbData,
            nilvim,
          },
        });
        resolve("ok");
      } catch (err) {
        reject("bad");
      }
    });
  };

  return { saveTicket, loading, data };
}
