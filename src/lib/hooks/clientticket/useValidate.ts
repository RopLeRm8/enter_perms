import { IFullName, IMelave, input } from "@/types/validates";

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
      fullname.firstName.length < 10 &&
      fullname.lastName.length > 0 &&
      fullname.lastName.length < 10
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
  return {
    checkId,
    checkOption,
    checkFullName,
    checkSiba,
    checkMelave,
    checkEzor,
  };
}
