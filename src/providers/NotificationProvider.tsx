"use client";
import React, { useState, ReactNode } from "react";
import { NotificationContext } from "@/contexts/NotificationContext";
import { Snackbar, Alert, Slide } from "@mui/material";

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const handleClose = () => {
    setMessage(null);
  };

  return (
    <NotificationContext.Provider
      value={{ message, isError, setMessage, setIsError }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={!!message}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <Alert
          severity={isError ? "error" : "success"}
          sx={{
            width: "100%",
            fontFamily: "David",
            fontSize: "110%",
            display: message ? "flex" : "none",
            direction: "rtl",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          {message}
        </Alert>
      </Snackbar>

      {children}
    </NotificationContext.Provider>
  );
};
