import { IStateTransformed } from "@/types/hooks";
import BadgeIcon from "@mui/icons-material/Badge";
import ArticleIcon from "@mui/icons-material/Article";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import KeyIcon from "@mui/icons-material/Key";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ConstructionIcon from "@mui/icons-material/Construction";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import MoneyIcon from "@mui/icons-material/Money";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttributionIcon from "@mui/icons-material/Attribution";
import HailIcon from "@mui/icons-material/Hail";
import FactoryIcon from "@mui/icons-material/Factory";

export default function useExtraTicketProps() {
  const extraTicketProps: {
    [K in keyof Partial<IStateTransformed>]: {
      label: string;
      icon?: JSX.Element;
    };
  } = {
    IDPerson: {
      label: "תעודה מזהה",
      icon: <BadgeIcon />,
    },
    HumenType: {
      label: "תפקיד",
      icon: <HailIcon />,
    },
    IndustryType: {
      label: "תחום תעשייה",
      icon: <FactoryIcon />,
    },
    FirstName: {
      label: "שם פרטי",
    },
    LastName: {
      label: "שם משפחה",
    },
    EntryReason: {
      label: "סיבת כניסה",
      icon: <ArticleIcon />,
    },
    ID_Guarantor: {
      label: "תעודה מזהה של המלווה",
      icon: <EscalatorWarningIcon />,
    },
    ClassifiedType: {
      label: "רמת סיווג",
      icon: <KeyIcon />,
    },
    StartDate: {
      label: "תאריך תחילת אישור",
      icon: <HourglassTopIcon />,
    },
    EndDate: {
      label: "תאריך סיום אישור",
      icon: <HourglassBottomIcon />,
    },
    WorkArea: {
      label: "סביבת עבודה",
      icon: <ConstructionIcon />,
    },
    HaveCar: {
      label: "האם הכניסה עם האוטו",
      icon: <TimeToLeaveIcon />,
    },
    CarNumber: {
      label: "מספר רכב",
      icon: <MoneyIcon />,
    },
    CarColor: {
      label: "צבע הרכב",
      icon: <ColorLensIcon />,
    },
    CarManufacture: {
      label: "יצרן האוטו",
      icon: <PrecisionManufacturingIcon />,
    },
    createdAt: {
      label: "תאריך הגשת בקשה",
      icon: <CalendarMonthIcon />,
    },
    CreatorUsername: {
      label: "תעודה מזהה של המגיש בקשה",
      icon: <AttributionIcon />,
    },
  };
  return extraTicketProps;
}
