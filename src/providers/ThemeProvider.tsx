"use client";

import { createTheme } from "@mui/material";

export const theme = createTheme({
  direction: "rtl",
  typography: { fontFamily: "David" },
  palette: {
    primary: {
      main: "#005bbb",
    },
    secondary: {
      main: "#00a69c",
    },
    error: {
      main: "#d3302f",
    },
    text: {
      primary: "#000000",
    },
  },
});
