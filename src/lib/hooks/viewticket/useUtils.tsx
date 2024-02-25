import { IStateTransformed } from "@/types/hooks";
import { INilve } from "@/types/ui";
import { Divider } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import TimerIcon from "@mui/icons-material/Timer";
import { ChangeEvent, useCallback, useEffect, useMemo } from "react";
import useFilter from "./useFilter";
import { useStateValue } from "@/providers/StateProvider";
import useReducerHandler from "../global/useReducerHandler";
import UpdateDisabledIcon from "@mui/icons-material/UpdateDisabled";

const KeysToTexts: { [key: string]: string } = {
  HumenType: "פרטי בקשה",
  HaveCar: "פרטי אוטו",
  CreatorUsername: "פרטים נוספים",
};

const StatusToIcon: { [key: string]: JSX.Element } = {
  בטיפול: <TimerIcon sx={{ ml: 1 }} />,
  אושר: <HowToRegIcon sx={{ ml: 1 }} />,
  "לא אושר": <DoDisturbIcon sx={{ ml: 1 }} />,
  "פג תוקף": <UpdateDisabledIcon sx={{ ml: 1 }} />,
};
export default function useUtils(tickets?: IStateTransformed[]) {
  const { filterById, filterByDate, filterByTafkid } = useFilter();
  const [state] = useStateValue();
  const { setFieldValue } = useReducerHandler();
  const filteredTickets = useMemo(() => {
    if (!tickets) return;
    return filterById(tickets, state.viewTickets.inputValue);
  }, [tickets, state.viewTickets.inputValue, filterById]);

  const checkIfNumeric = useCallback(
    (
      setFunc: (
        fieldPath: string,
        value: string | boolean | IStateTransformed | Date | INilve[]
      ) => void,
      value: string
    ) => {
      if (/^\d*$/.test(value)) {
        setFunc("viewTickets.entryCode", value);
      }
    },
    []
  );

  const groupTicketsByStatus = useCallback(
    (tickets: IStateTransformed[]): Record<string, IStateTransformed[]> => {
      const pagTokef = "פג תוקף";
      return tickets?.reduce((acc, ticket) => {
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

  const pasteDivider = useCallback((key: string) => {
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
  }, []);

  const isPag = useCallback(
    (
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
    },
    []
  );

  const handleDateSort = useCallback(
    (ascending = false) => {
      const sortedTickets = filterByDate(
        state.viewTickets.groupedTickets || {},
        ascending
      );
      setFieldValue("viewTickets.groupedTickets", sortedTickets);
    },
    [state.viewTickets.groupedTickets, setFieldValue, filterByDate]
  );

  const handleTafkidSort = useCallback(
    (e: ChangeEvent<HTMLInputElement>, isHayal: boolean) => {
      const checked = e.target.checked;
      const newSortSoldier = isHayal ? checked : state.viewTickets.sortSoldier;
      const newSortEzrah = !isHayal ? checked : state.viewTickets.sortEzrah;

      if (isHayal) setFieldValue("viewTickets.sortSoldier", newSortSoldier);
      if (!isHayal) setFieldValue("viewTickets.sortEzrah", newSortEzrah);
      setFieldValue(
        "viewTickets.sortCount",
        state.viewTickets.sortCount + (checked ? 1 : -1)
      );

      if (!newSortSoldier && !newSortEzrah) {
        setFieldValue(
          "viewTickets.groupedTickets",
          state.viewTickets.originalTickets
        );
        return;
      }
      setFieldValue(
        "viewTickets.groupedTickets",
        filterByTafkid(state.viewTickets.groupedTickets || {}, isHayal)
      );
    },
    [
      filterByTafkid,
      state.viewTickets.groupedTickets,
      state.viewTickets.originalTickets,
      state.viewTickets.sortSoldier,
      state.viewTickets.sortEzrah,
      setFieldValue,
      state.viewTickets.sortCount,
    ]
  );

  const groupedTicketsMemo = useMemo(() => {
    if (!filteredTickets) return;
    return groupTicketsByStatus(filteredTickets);
  }, [filteredTickets, groupTicketsByStatus]);

  useEffect(() => {
    if (!groupedTicketsMemo) return;
    setFieldValue("viewTickets.groupedTickets", groupedTicketsMemo);
    setFieldValue("viewTickets.originalTickets", groupedTicketsMemo);
  }, [groupedTicketsMemo, setFieldValue]);

  useEffect(() => {}, []);

  return {
    checkIfNumeric,
    groupTicketsByStatus,
    pasteDivider,
    StatusToIcon,
    isPag,
    handleDateSort,
    handleTafkidSort,
  };
}
