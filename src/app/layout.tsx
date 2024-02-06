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
      <body style={{ margin: 0 }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
