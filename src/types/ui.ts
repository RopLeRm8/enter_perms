interface IAddModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface INilve {
  humanType: string;
  taasiaType: string;
  id: string;
  firstName: string;
  lastName: string;
}

type IValidatorFunction = (input: string, title?: string) => boolean;

export type { IAddModal, INilve, IValidatorFunction };
