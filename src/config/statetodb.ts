import { IStateToDBMap } from "@/types/hooks";

export const STATETODB: IStateToDBMap = {
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
