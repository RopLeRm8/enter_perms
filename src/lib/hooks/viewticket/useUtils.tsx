import { IStateTransformed } from "@/types/hooks";
import { INilve } from "@/types/ui";
import { Divider } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import TimerIcon from "@mui/icons-material/Timer";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import useFilter from "./useFilter";
import { useStateValue } from "@/providers/StateProvider";
import useReducerHandler from "../createticket/useReducerHandler";
import UpdateDisabledIcon from "@mui/icons-material/UpdateDisabled";
import { NotificationContext } from "@/contexts/NotificationContext";

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
  const { setFieldValue, steps } = useReducerHandler();
  const notifContext = useContext(NotificationContext);
  const setNotif = notifContext.setMessage;
  const setIsError = notifContext.setIsError;
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

  const personIsHayal = useCallback(
    (val: string) => {
      return steps[0].options.findIndex((opt) => opt.optionname === val) < 3;
    },
    [steps]
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
      const currentSortValue = isHayal
        ? state.viewTickets.sortSoldier
        : state.viewTickets.sortEzrah;
      const oppositeSortValue = isHayal
        ? state.viewTickets.sortEzrah
        : state.viewTickets.sortSoldier;
      let newSortCount = state.viewTickets.sortCount;

      if (checked && !currentSortValue && oppositeSortValue) {
      } else if (!checked && currentSortValue) {
        newSortCount -= 1;
      } else if (checked && !currentSortValue && !oppositeSortValue) {
        newSortCount += 1;
      }

      setFieldValue("viewTickets.sortSoldier", isHayal ? checked : false);
      setFieldValue("viewTickets.sortEzrah", !isHayal ? checked : false);
      setFieldValue("viewTickets.sortCount", newSortCount);

      if (
        !isHayal
          ? !checked
          : !state.viewTickets.sortSoldier && !isHayal
          ? !state.viewTickets.sortEzrah
          : !checked
      ) {
        setFieldValue(
          "viewTickets.groupedTickets",
          state.viewTickets.originalTickets
        );
        return;
      }
      setFieldValue(
        "viewTickets.groupedTickets",
        filterByTafkid(
          state.viewTickets.originalTickets || {},
          isHayal,
          personIsHayal
        )
      );
    },
    [
      personIsHayal,
      filterByTafkid,
      state.viewTickets.originalTickets,
      state.viewTickets.sortSoldier,
      state.viewTickets.sortEzrah,
      state.viewTickets.sortCount,
      setFieldValue,
    ]
  );

  const handleCopyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setNotif("העתקת את הטקסט בהצלחה");
    setIsError(false);
  };

  const handleGroupUpdate = useCallback(
    (personId: string, newStatus: "בטיפול" | "אושר" | "לא אושר") => {
      if (!state.viewTickets.groupedTickets) return;
      const updatedGroupedTickets = { ...state.viewTickets.groupedTickets };
      let updated = false;
      Object.entries(updatedGroupedTickets).forEach(([status, tickets]) => {
        const ticketIndex = tickets.findIndex(
          (ticket) => ticket.IDPerson === personId
        );

        if (ticketIndex > -1) {
          const ticketToUpdate = tickets[ticketIndex];

          if (ticketToUpdate.ApproveStatus !== newStatus) {
            const updatedTickets = tickets.slice();
            updatedTickets.splice(ticketIndex, 1);
            updatedGroupedTickets[status] = updatedTickets;

            if (!updatedGroupedTickets[newStatus]) {
              updatedGroupedTickets[newStatus] = [];
            }
            ticketToUpdate.ApproveStatus = newStatus;
            updatedGroupedTickets[newStatus].push(ticketToUpdate);

            updated = true;
          }
        }
      });

      if (updated) {
        setFieldValue("viewTickets.groupedTickets", updatedGroupedTickets);
      }
    },
    [setFieldValue, state.viewTickets.groupedTickets]
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

  return {
    checkIfNumeric,
    groupTicketsByStatus,
    pasteDivider,
    StatusToIcon,
    isPag,
    handleDateSort,
    handleTafkidSort,
    handleCopyToClipboard,
    handleGroupUpdate,
  };
}
