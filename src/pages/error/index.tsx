import { Box, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";

const ErrorPage = () => {
  const router = useRouter();
  const { status, text } = router.query;
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        pt: 40,
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "250%",
          direction: "rtl",
          color: theme.palette.error.main,
        }}
      >
        קרה משהו שלא תכננו שיקרה!
      </Typography>
      <Typography sx={{ fontSize: "150%", color: theme.palette.error.main }}>
        קוד שגיאה: {status || "Unknown"}
      </Typography>
      <Typography sx={{ fontSize: "150%", color: theme.palette.primary.main }}>
        {text}
      </Typography>
    </Box>
  );
};

export default ErrorPage;
