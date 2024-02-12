import { IFullName, IMelave, IRehev, input } from "@/types/validates";

export default function useValidate() {
  const checkId = (input: input, title?: string) => {
    if (title === "הזן מספר אישי") {
      return input.length > 6 && input.length < 9;
    } else {
      return input.length === 9;
    }
  };
  const checkOption = (input: input) => {
    return input !== "";
  };
  const checkFullName = (fullname: IFullName) => {
    return (
      fullname.firstName.length > 0 &&
      fullname.firstName.length < 11 &&
      fullname.lastName.length > 0 &&
      fullname.lastName.length < 11
    );
  };
  const checkSiba = (input: input) => {
    return input.length > 0;
  };
  const checkMelave = (melave: IMelave) => {
    return (
      melave.misparIshi?.length > 6 &&
      melave.misparIshi?.length < 9 &&
      melave.firstName?.length > 0 &&
      melave.firstName?.length < 10 &&
      melave.lastName?.length > 0 &&
      melave.lastName?.length < 10 &&
      melave.phone?.length > 8 &&
      melave.phone?.length < 11
    );
  };
  const checkEzor = checkSiba;
  const checkRehev = (rehev: IRehev) => {
    return (
      rehev.vehicleNum.length > 4 &&
      rehev.vehicleNum.length < 9 &&
      rehev.vehicleCol.length > 2 &&
      rehev.vehicleType.length > 0
    );
  };
  return {
    checkId,
    checkOption,
    checkFullName,
    checkSiba,
    checkMelave,
    checkEzor,
    checkRehev,
  };
}
