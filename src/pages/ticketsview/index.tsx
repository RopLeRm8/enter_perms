import { ServerPropsApi } from "@/lib/hooks/api/serverPropsApi";
import { IStateTransformed } from "@/types/hooks";
import { ITicketsView } from "@/types/ui";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { GetServerSidePropsContext } from "next";
import TicketModal from "./ticketmodal";
import useReducerHandler from "@/lib/hooks/clientticket/useReducerHandler";
import { useStateValue } from "@/providers/StateProvider";
import useModalUtils from "@/lib/hooks/viewticket/useModalUtils";
import useFilter from "@/lib/hooks/viewticket/useFilter";

export default function TicketsView({ tickets, error }: ITicketsView) {
  const theme = useTheme();
  const { setFieldValue } = useReducerHandler();
  const [state] = useStateValue();
  const { filterById, filterByDate } = useFilter();
  const filteredTickets = filterById(tickets, state.viewTickets.inputValue);
  const { groupTicketsByStatus, StatusToIcon } = useModalUtils();
  const groupedTickets = groupTicketsByStatus(filteredTickets);
  return (
    <>
      <TicketModal
        ticket={state.viewTickets.openedTicket}
        open={state.viewTickets.ticketModalOpen}
        entryCode={state.viewTickets.entryCode}
        tickets={groupedTickets}
      />
      {error ? <Typography>{error}</Typography> : null}
      {!error && (
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            mb: 4,
          }}
          elevation={5}
        >
          <Box sx={{ display: "flex", gap: "2rem" }}>
            <Box>
              <IconButton
                onClick={(e) =>
                  setFieldValue("viewTickets.menuEl", e.currentTarget)
                }
              >
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={state.viewTickets.menuEl}
                open={!!state.viewTickets.menuEl}
                onClose={() => setFieldValue("viewTickets.menuEl", null)}
              >
                <MenuItem>סדר לפי תאריך (עולה)</MenuItem>
                <MenuItem>סדר לפי תאריך (יורד)</MenuItem>
              </Menu>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  whiteSpace: "nowrap",
                  fontSize: "120%",
                }}
              >
                הצג בקשות עם פג תוקף
              </Typography>
              <Checkbox
                onChange={() =>
                  setFieldValue(
                    "viewTickets.showPag",
                    !state.viewTickets.showPag
                  )
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  whiteSpace: "nowrap",
                  fontSize: "120%",
                }}
              >
                חיפוש בקשרות לפי תעודה מזהה
              </Typography>
              <Autocomplete
                options={tickets.map((ticket) => ticket.IDPerson)}
                value={state.viewTickets.inputValue}
                renderInput={(props) => (
                  <TextField
                    dir="rtl"
                    {...props}
                    placeholder="מספר תעודה מזהה"
                    onChange={(e) =>
                      setFieldValue("viewTickets.inputValue", e.target.value)
                    }
                    InputProps={{
                      ...props.InputProps,
                      sx: {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                )}
                slotProps={{
                  clearIndicator: {
                    sx: {
                      color: theme.palette.primary.main,
                    },
                  },
                  paper: {
                    sx: {
                      direction: "rtl",
                      color: theme.palette.primary.main,
                    },
                  },
                  popupIndicator: {
                    sx: {
                      color: theme.palette.primary.main,
                    },
                  },
                }}
                onChange={(_, nVal) =>
                  setFieldValue("viewTickets.inputValue", nVal ?? "")
                }
                sx={{ width: "100%" }}
              />
            </Box>
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "230%",
              my: 5,
              color: theme.palette.primary.main,
            }}
          >
            צפייה בבקשות לאישורי כניסה
          </Typography>
        </Paper>
      )}
      <Grid container direction="column" sx={{ px: 1 }}>
        {!error &&
          Object.entries(groupedTickets).map(([status, ticketsInGroup]) => (
            <>
              {(status === "פג תוקף" && state.viewTickets.showPag) ||
              status !== "פג תוקף" ? (
                <Box key={status}>
                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      my: 1,
                      fontSize: "250%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {status}
                    {StatusToIcon[status]}
                  </Typography>

                  {ticketsInGroup.map((ticket, ticketIndex) => (
                    <Grid item key={ticketIndex}>
                      <Paper
                        sx={{
                          background: "white",
                          display: "flex",
                          flexDirection: "column",
                          mb: 1,
                        }}
                        elevation={6}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: theme.palette.primary.main,
                            direction: "rtl",
                            p: 2,
                            px: 5,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              gap: "2rem",
                              borderRadius: "20px",
                            }}
                          >
                            <Typography sx={{ fontSize: "130%" }}>
                              תעודה מזהה: {ticket.IDPerson}
                            </Typography>
                            <Typography sx={{ fontSize: "130%" }}>
                              שם מלא:{`${ticket.FirstName} ${ticket.LastName}`}
                            </Typography>
                            <Typography sx={{ fontSize: "130%" }}>
                              תפקיד:{ticket.HumenType}
                            </Typography>
                            {ticket.IndustryType && (
                              <Typography sx={{ fontSize: "130%" }}>
                                תעסוקה:{ticket.IndustryType}
                              </Typography>
                            )}
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "0.1rem",
                              alignItems: "center",
                              minWidth: "33%",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{ fontSize: "150%", ml: 2, height: "2rem" }}
                              onClick={() => {
                                setFieldValue(
                                  "viewTickets.ticketModalOpen",
                                  true
                                );
                                setFieldValue(
                                  "viewTickets.openedTicket",
                                  ticket
                                );
                              }}
                            >
                              צפייה בבקשה
                            </Button>
                            <Typography
                              sx={{
                                fontSize: "130%",
                                mx: 3,
                                minWidth: "22rem",
                              }}
                            >
                              תאריך פתיחה
                              <span
                                style={{
                                  fontWeight: 600,
                                  marginRight: 10,
                                }}
                              >
                                <>
                                  {ticket.createdAt
                                    ? new Date(
                                        ticket.createdAt
                                      ).toLocaleDateString("he-IL", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        weekday: "long",
                                      })
                                    : "Invalid date"}
                                </>
                              </span>
                            </Typography>
                            <AccessTimeIcon sx={{ height: "2.8vh" }} />
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Box>
              ) : null}
            </>
          ))}
      </Grid>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const data = await ServerPropsApi<IStateTransformed>({
      url: `http://localhost:3000/api/controllers/gettickets`,
      method: "GET",
    });
    return { props: { tickets: data } };
  } catch (error) {
    return {
      props: { tickets: [], error: "קרתה שגיאה בזמן ההתחברות לבסיס נתונים" },
    };
  }
}