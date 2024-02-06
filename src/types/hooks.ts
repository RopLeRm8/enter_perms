interface IOptions {
  optionname: string;
  icon?: JSX.Element;
}

interface IStep {
  name: string;
  fieldName: string;
  options: IOptions[];
  isBig?: boolean;
  isSivug?: boolean;
  isDate?: boolean;
  isRehev?: boolean;
  twoFields?: boolean;
  isMelave?: boolean;
  onlyNum?: boolean;
}

export type { IStep };
