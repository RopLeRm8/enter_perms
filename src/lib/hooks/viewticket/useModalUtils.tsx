import { IStateTransformed } from "@/types/hooks";
import { INilve } from "@/types/ui";
import { Divider } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import TimerIcon from "@mui/icons-material/Timer";
import { useCallback } from "react";
const KeysToTexts: { [key: string]: string } = {
  HumenType: "פרטי בקשה",
  HaveCar: "פרטי אוטו",
  CreatorUsername: "פרטים נוספים",
};

const StatusToIcon: { [key: string]: JSX.Element } = {
  בטיפול: <TimerIcon sx={{ ml: 1 }} />,
  אושר: <HowToRegIcon sx={{ ml: 1 }} />,
  "לא אושר": <DoDisturbIcon sx={{ ml: 1 }} />,
};
export default function useModalUtils() {
  const checkIfNumeric = (
    setFunc: (
      fieldPath: string,
      value: string | boolean | IStateTransformed | Date | INilve[]
    ) => void,
    value: string
  ) => {
    if (/^\d*$/.test(value)) {
      setFunc("viewTickets.entryCode", value);
    }
  };

  const groupTicketsByStatus = useCallback(
    (tickets: IStateTransformed[]): Record<string, IStateTransformed[]> => {
      const pagTokef = "פג תוקף";
      return tickets.reduce((acc, ticket) => {
        const { ApproveStatus } = ticket;
        if (
          new Date(ticket.EndDate).setHours(0, 0, 0, 0) <
          new Date().setHours(0, 0, 0, 0)
        ) {
          if (!acc[pagTokef]) {
            acc[pagTokef] = [];
          }
          acc[pagTokef].push(ticket);
        } else {
          if (!acc[ApproveStatus]) {
            acc[ApproveStatus] = [];
          }
          acc[ApproveStatus].push(ticket);
        }
        return acc;
      }, {} as Record<string, IStateTransformed[]>);
    },
    []
  );

  const pasteDivider = (key: string) => {
    if (KeysToTexts[key]) {
      return (
        <Divider
          sx={{
            "&:before": { borderColor: "primary.main" },
            "&:after": { borderColor: "primary.main" },
            mb: 4,
            color: "primary.main",
            fontFamily: "David",
            fontSize: "150%",
          }}
        >
          {KeysToTexts[key]}
        </Divider>
      );
    }
  };

  const isPag = (
    tickets: Record<string, IStateTransformed[]>,
    ticket: Partial<IStateTransformed>
  ): boolean => {
    let isPag = false;
    Object.entries(tickets).map((ticked) => {
      if (ticked[0] === "פג תוקף") {
        isPag = !!ticked[1].find(
          (ticked) => ticked.IDPerson === ticket?.IDPerson
        );
      }
    });
    return isPag;
  };

  return {
    checkIfNumeric,
    groupTicketsByStatus,
    pasteDivider,
    StatusToIcon,
    isPag,
  };
}
