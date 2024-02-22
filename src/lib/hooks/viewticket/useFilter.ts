import { IStateTransformed } from "@/types/hooks";

export default function useFilter() {
  const filterById = (tickets: IStateTransformed[], input: string | null) => {
    if (input === null) return tickets;
    return tickets.filter((ticket) => ticket.IDPerson.includes(input));
  };

  const filterByDate = (tickets: Record<string, IStateTransformed[]>) => {
    Object.keys(tickets).forEach((status) => {
      tickets[status].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    });
  };
  return { filterById, filterByDate };
}
