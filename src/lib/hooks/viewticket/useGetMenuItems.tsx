import { Checkbox, MenuItem, Typography, useTheme } from "@mui/material";
import useReducerHandler from "../global/useReducerHandler";
import { useStateValue } from "@/providers/StateProvider";
import { IMenuItems } from "@/types/hooks";
import UpdateDisabledIcon from "@mui/icons-material/UpdateDisabled";
import useUtils from "./useUtils";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function useGetMenuItems() {
  const { setFieldValue } = useReducerHandler();
  const [state] = useStateValue();
  const theme = useTheme();
  const { handleTafkidSort, handleDateSort } = useUtils();
  const MenuItems = [
    {
      label: "הצג בקשות עם פג תוקף",
      applyStyles: false,
      checkedValue: state.viewTickets.showPag,
      checkFunc: (e) => {
        setFieldValue("viewTickets.showPag", !state.viewTickets.showPag);
        setFieldValue(
          "viewTickets.sortCount",
          state.viewTickets.sortCount + (e.target.checked ? 1 : -1)
        );
      },
      icon: <UpdateDisabledIcon sx={{ color: theme.palette.primary.main }} />,
    },
    {
      label: "הצג רק בקשות של חיילים",
      applyStyles: false,
      checkedValue: state.viewTickets.sortSoldier,
      checkFunc: (e) => handleTafkidSort(e, true),
      icon: <MilitaryTechIcon sx={{ color: theme.palette.primary.main }} />,
    },
    {
      label: "הצג רק בקשות של אזרחים",
      applyStyles: false,
      checkedValue: state.viewTickets.sortEzrah,
      checkFunc: (e) => handleTafkidSort(e, false),
      icon: <EmojiPeopleIcon sx={{ color: theme.palette.primary.main }} />,
    },
    {
      label: "סדר לפי תאריך (עולה)",
      applyStyles: true,
      clickFunc: () => handleDateSort(true),
      icon: <ArrowUpwardIcon sx={{ color: theme.palette.primary.main }} />,
    },
    {
      label: "סדר לפי תאריך (יורד)",
      applyStyles: true,
      clickFunc: () => handleDateSort(false),
      icon: <ArrowDownwardIcon sx={{ color: theme.palette.primary.main }} />,
    },
  ] as IMenuItems[];

  return { MenuItems };
}
