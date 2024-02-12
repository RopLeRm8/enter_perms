import { NotificationProvider } from "@/providers/NotificationProvider";
import { theme } from "@/providers/ThemeProvider";
import { ThemeProvider } from "@mui/material";

export const metadata = {
  title: "אתר בקשות כניסה - אבטחת מידע",
  description: "משהו צבאי",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/cyber.png" />
      </head>
      <body style={{ margin: 0 }}>
        <ThemeProvider theme={theme}>
          <NotificationProvider>{children}</NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
