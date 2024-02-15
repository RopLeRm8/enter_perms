import { formReducer, initialState } from "@/lib/hooks/clientticket/useReducer";
import { NotificationProvider } from "@/providers/NotificationProvider";
import { StateProvider } from "@/providers/StateProvider";
import { theme } from "@/providers/ThemeProvider";
import { ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";
import "@/css/global.css";
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateProvider initialState={initialState} reducer={formReducer}>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <Head>
            <link rel="icon" href="/cyber.png" />
          </Head>
          <Component {...pageProps} />
        </NotificationProvider>
      </ThemeProvider>
    </StateProvider>
  );
}
