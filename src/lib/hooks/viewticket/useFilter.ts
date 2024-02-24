import { IStateTransformed } from "@/types/hooks";
import { useCallback } from "react";

export default function useFilter() {
  const filterById = useCallback(
    (tickets: IStateTransformed[], input: string | null) => {
      if (input === null) return tickets;
      return tickets?.filter((ticket) => ticket.IDPerson.includes(input));
    },
    []
  );

  const filterByDate = useCallback(
    (tickets: Record<string, IStateTransformed[]>, isOle?: boolean) => {
      const sortedTickets = Object.keys(tickets).reduce((acc, status) => {
        const sortByArr = [...tickets[status]].sort((a, b) =>
          isOle
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        acc[status] = sortByArr;
        return acc;
      }, {} as Record<string, IStateTransformed[]>);

      return sortedTickets;
    },
    []
  );

  const filterByTafkid = useCallback(
    (tickets: Record<string, IStateTransformed[]>) => {
      const sortedTickets = Object.keys(tickets).reduce((acc, status) => {
        const tafkidTickets = [...tickets[status]].filter(
          (ticket) => ticket.HumenType === "מילואים"
        );
        if (tafkidTickets.length > 0) {
          acc[status] = tafkidTickets;
        }
        return acc;
      }, {} as Record<string, IStateTransformed[]>);

      return sortedTickets;
    },
    []
  );
  return { filterById, filterByDate, filterByTafkid };
}
