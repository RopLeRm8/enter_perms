import { ServerPropsApi } from "@/lib/hooks/api/serverPropsApi";
import { IStateTransformed } from "@/types/hooks";
import { ITicketsView } from "@/types/ui";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Autocomplete,
  Badge,
  Box,
  Button,
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItemButton,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import TicketModal from "./ticketmodal";
import useReducerHandler from "@/lib/hooks/createticket/useReducerHandler";
import useUtils from "@/lib/hooks/viewticket/useUtils";
import useGetMenuItems from "@/lib/hooks/viewticket/useGetMenuItems";

export default function TicketsView({ tickets, error }: ITicketsView) {
  const theme = useTheme();
  const { setFieldValue, state } = useReducerHandler();
  const { StatusToIcon } = useUtils(tickets);
  const { MenuItems } = useGetMenuItems();

  const handleToggle = (status: string) => {
    const updatedExpandedStatuses = state.viewTickets.expandedStatuses;
    updatedExpandedStatuses[status] = !updatedExpandedStatuses[status];
    setFieldValue("viewTickets.expandedStatuses", updatedExpandedStatuses);
  };
  return (
    <>
      <TicketModal
        ticket={state.viewTickets.openedTicket}
        open={state.viewTickets.ticketModalOpen}
        entryCode={state.viewTickets.entryCode}
        tickets={state.viewTickets.groupedTickets}
      />
      {error ? <Typography>{error}</Typography> : null}
      {!error && (
        <Paper
          sx={{
            mb: 4,
            justifyContent: "end",
          }}
          elevation={5}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
              maxWidth: "96%",
              mx: "auto",
            }}
          >
            <Box sx={{ display: "flex", gap: "2rem" }}>
              <Box sx={{ alignSelf: "end" }}>
                <Badge
                  badgeContent={state.viewTickets.sortCount}
                  color="primary"
                  componentsProps={{
                    badge: {
                      style: {
                        fontSize: "90%",
                      },
                    },
                  }}
                >
                  <IconButton
                    onClick={(e) =>
                      setFieldValue("viewTickets.menuEl", e.currentTarget)
                    }
                  >
                    <FilterListIcon
                      sx={{ color: theme.palette.primary.main }}
                    />
                  </IconButton>
                </Badge>
                <Menu
                  anchorEl={state.viewTickets.menuEl}
                  open={!!state.viewTickets.menuEl}
                  onClose={() => setFieldValue("viewTickets.menuEl", null)}
                  sx={{ direction: "rtl" }}
                >
                  {MenuItems.map((item) => (
                    <MenuItem
                      key={item.label}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        minWidth: item.applyStyles ? "5rem" : "0rem",
                        ml: item.applyStyles ? 2 : 0,
                      }}
                      disableTouchRipple
                      onClick={item.clickFunc}
                    >
                      {item.icon}
                      <Typography
                        sx={{
                          color: theme.palette.primary.main,
                          whiteSpace: "nowrap",
                          fontSize: "120%",
                          mr: 1,
                        }}
                      >
                        {item.label}
                      </Typography>
                      {item.checkedValue !== undefined ? (
                        <Checkbox
                          checked={item.checkedValue}
                          onChange={item.checkFunc}
                        />
                      ) : null}
                    </MenuItem>
                  ))}
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
                  חיפוש בקשות לפי תעודה מזהה
                </Typography>
                <Autocomplete
                  options={tickets.map((ticket) => ticket.IDPerson)}
                  value={state.viewTickets.idInputValue}
                  noOptionsText="אין בקשות"
                  renderOption={(props, opt) => (
                    <Typography
                      {...props}
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                        fontSize: "110%",
                      }}
                    >
                      {opt}
                    </Typography>
                  )}
                  renderInput={(props) => (
                    <TextField
                      dir="rtl"
                      {...props}
                      placeholder="מספר תעודה מזהה"
                      onChange={(e) =>
                        setFieldValue(
                          "viewTickets.idInputValue",
                          e.target.value
                        )
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
                    setFieldValue("viewTickets.idInputValue", nVal ?? "")
                  }
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: ".5rem",
                  ml: 5,
                }}
              >
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    whiteSpace: "nowrap",
                    fontSize: "120%",
                  }}
                >
                  חיפוש בקשות לפי שם
                </Typography>
                <Autocomplete
                  options={tickets.map(
                    (ticket) => ticket.FirstName + " " + ticket.LastName
                  )}
                  value={state.viewTickets.nameInputValue}
                  noOptionsText="אין בקשות"
                  renderOption={(props, opt) => (
                    <Typography
                      {...props}
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                        fontSize: "110%",
                      }}
                    >
                      {opt}
                    </Typography>
                  )}
                  renderInput={(props) => (
                    <TextField
                      dir="rtl"
                      {...props}
                      placeholder="שם מלא"
                      onChange={(e) =>
                        setFieldValue(
                          "viewTickets.nameInputValue",
                          e.target.value
                        )
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
                    setFieldValue("viewTickets.nameInputValue", nVal ?? "")
                  }
                  sx={{ width: "130%" }}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
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
              <video autoPlay muted style={{ width: "6rem" }}>
                <source src="/static/gifs/ticket.mp4" type="video/mp4" />
              </video>
            </Box>
          </Box>
        </Paper>
      )}
      <Grid
        container
        direction="column"
        sx={{ px: 1, maxWidth: "96%", mx: "auto" }}
      >
        {!error &&
          Object.entries(
            state.viewTickets.groupedTickets
              ? state.viewTickets.groupedTickets
              : {}
          ).map(([status, ticketsInGroup]) => (
            <>
              {((status === "פג תוקף" && state.viewTickets.showPag) ||
                status !== "פג תוקף") &&
              ticketsInGroup.length > 0 ? (
                <List key={status} component="nav">
                  <ListItemButton
                    onClick={() => handleToggle(status)}
                    sx={{
                      direction: "rtl",
                    }}
                  >
                    <Typography
                      sx={{
                        color: theme.palette.primary.main,
                        my: 3,
                        fontSize: "250%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                      }}
                    >
                      {status}
                      {StatusToIcon[status]}
                    </Typography>
                    {state.viewTickets.expandedStatuses[status] ? (
                      <ExpandLess sx={{ color: theme.palette.primary.main }} />
                    ) : (
                      <ExpandMore sx={{ color: theme.palette.primary.main }} />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={state.viewTickets.expandedStatuses[status]}
                    timeout="auto"
                    unmountOnExit
                  >
                    {ticketsInGroup.map((ticket) => (
                      <Grid item key={`${ticket.id}`}>
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
                                שם מלא:
                                {`${ticket.FirstName} ${ticket.LastName}`}
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
                                color="secondary"
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
                  </Collapse>
                </List>
              ) : null}
            </>
          ))}
      </Grid>
    </>
  );
}

export async function getServerSideProps() {
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
