"use client";

import { createTheme } from "@mui/material";

export const theme = createTheme({
  direction: "rtl",
  typography: { fontFamily: "Assistant" },
  palette: {
    primary: {
      main: "#005bbb",
    },
    secondary: {
      main: "#00a69c",
    },
    text: {
      primary: "#FFFFFFF",
    },
  },
});
