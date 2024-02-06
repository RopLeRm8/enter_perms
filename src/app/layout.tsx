import { theme } from "@/providers/ThemeProvider";
import { ThemeProvider } from "@mui/material";
import "@/css/global.css";

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
      <body>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
