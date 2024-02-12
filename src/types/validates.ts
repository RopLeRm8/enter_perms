type input = string;

interface IFullName {
  firstName: string;
  lastName: string;
}
interface IMelave {
  misparIshi: string;
  firstName: string;
  lastName: string;
  phone: string;
}
interface IRehev {
  vehicleNum: string;
  vehicleCol: string;
  vehicleType: string;
}
export type { input, IFullName, IMelave, IRehev };
