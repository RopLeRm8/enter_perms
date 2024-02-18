"use client";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
export default function notFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 60,
      }}
    >
      <Typography
        sx={{
          fontSize: "600%",
          fontWeight: 600,
          direction: "rtl",
          position: "absolute",
          transform: "translateX(-20%)",
          fontFamily: "David",
        }}
      >
        404
        <Image
          src="/static/img/404.png"
          alt=""
          width={100}
          height={100}
          style={{ position: "relative", left: 210, zIndex: -1 }}
        />
      </Typography>
      <Typography
        color="primary"
        sx={{
          fontSize: "200%",
          fontWeight: 600,
          mb: 2,
          mt: 15,
          fontFamily: "David",
        }}
      >
        העמוד שחיפשתם לא נמצא
      </Typography>
      <a href="/">
        <Button
          variant="contained"
          sx={{ fontSize: "120%", fontFamily: "David" }}
        >
          חזרה לעמוד ראשי
        </Button>
      </a>
    </Box>
  );
}
