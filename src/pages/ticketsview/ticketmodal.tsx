import useReducerHandler from "@/lib/hooks/global/useReducerHandler";
import useExtraTicketProps from "@/lib/hooks/viewticket/useExtraTicketProps";
import useUtils from "@/lib/hooks/viewticket/useUtils";
import useUpdateStatus from "@/lib/hooks/viewticket/useUpdateStatus";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ITicketModal } from "@/types/ui";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

export default function TicketModal({
  ticket,
  open,
  entryCode,
  tickets,
}: ITicketModal) {
  const extraTicketProps = useExtraTicketProps();
  const theme = useTheme();
  const { setFieldValue, state } = useReducerHandler();
  const { checkIfNumeric, pasteDivider, isPag, handleCopyToClipboard } =
    useUtils();
  const { updateStatus, loading } = useUpdateStatus(
    state.viewTickets.acceptTicket
  );
  return (
    <Drawer
      open={open}
      onClose={() => {
        setFieldValue("viewTickets.ticketModalOpen", false);
        setFieldValue("viewTickets.entryCode", "");
      }}
      SlideProps={{
        direction: "left",
      }}
      PaperProps={{
        sx: {
          p: 4,
          py: 5,
          background: "white",
          boxShadow: "0px 0px 10px 5px white",
          maxWidth: "50%",
        },
      }}
      anchor="right"
      autoFocus
    >
      <Grid container spacing={3} sx={{ direction: "rtl" }}>
        {ticket &&
          Object.entries(ticket).map(([key, value]) => {
            if (key in extraTicketProps && value) {
              const extraProp =
                extraTicketProps[key as keyof typeof extraTicketProps];
              return (
                <Grid item key={key} xs={13}>
                  {pasteDivider(key)}
                  <Box sx={{ display: "flex", gap: ".5rem" }}>
                    <span style={{ color: theme.palette.primary.main }}>
                      {extraProp?.icon}
                    </span>
                    <Typography
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "130%",
                      }}
                    >
                      {extraProp?.label}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "140%",
                      color: theme.palette.secondary.main,
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        handleCopyToClipboard(
                          typeof value !== "object"
                            ? value.toString()
                            : (value as object as { data: number[] })
                                .data[0] === 0
                            ? "לא"
                            : "כן"
                        )
                      }
                    >
                      <ContentCopyIcon
                        sx={{ color: theme.palette.primary.main }}
                      />
                    </IconButton>
                    {typeof value !== "object" ? (
                      <>{value}</>
                    ) : (
                      <>
                        {(value as object as { data: number[] }).data[0] === 0
                          ? "לא"
                          : "כן"}
                      </>
                    )}
                  </Typography>
                </Grid>
              );
            }
          })}
      </Grid>
      <Divider
        sx={{
          "&:before": { borderColor: theme.palette.primary.main },
          "&:after": { borderColor: theme.palette.primary.main },
          background: theme.palette.primary.main,
          my: 5,
          visibility:
            ticket?.ApproveStatus === "בטיפול" && !isPag(tickets ?? {}, ticket)
              ? "visible"
              : "hidden",
        }}
      />
      {ticket?.ApproveStatus === "בטיפול" && !isPag(tickets ?? {}, ticket) ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Badge
              badgeContent="✓"
              color="primary"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                ".MuiBadge-badge": {
                  top: "20%",
                  right: "5%",
                  border: `2px solid ${theme.palette.background.paper}`,
                  padding: "0 4px",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "30px",
                },
              }}
              invisible={!state.viewTickets.acceptTicket}
            >
              <Button
                color="secondary"
                variant="contained"
                sx={{ px: 8, fontSize: "150%" }}
                onClick={() => setFieldValue("viewTickets.acceptTicket", true)}
              >
                אשר
              </Button>
            </Badge>
            <Badge
              badgeContent="✓"
              color="primary"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                ".MuiBadge-badge": {
                  top: "20%",
                  right: "5%",
                  border: `2px solid ${theme.palette.background.paper}`,
                  padding: "0 4px",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "30px",
                },
              }}
              invisible={state.viewTickets.acceptTicket}
            >
              <Button
                color="error"
                variant="contained"
                sx={{ px: 8, fontSize: "150%" }}
                onClick={() => setFieldValue("viewTickets.acceptTicket", false)}
              >
                דחה
              </Button>
            </Badge>
          </Box>
          {state.viewTickets.acceptTicket ? (
            <>
              <Typography
                sx={{
                  direction: "rtl",
                  mt: 4,
                  color: theme.palette.primary.main,
                  fontSize: "130%",
                }}
              >
                נא הקש קוד אישור
              </Typography>
              <TextField
                fullWidth
                placeholder="קוד אישור"
                dir="rtl"
                value={entryCode || ""}
                sx={{
                  border: "1px white solid",
                  borderRadius: "10px",
                  mt: 1,
                  "& .MuiInputBase-root": {
                    borderRadius: "10px",
                  },
                  "& .MuiInputBase-input": {
                    color: theme.palette.primary.main,
                    fontFamily: "David",
                    fontSize: "130%",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: theme.palette.primary.main,
                    fontFamily: "David",
                    fontSize: "100%",
                  },
                }}
                inputProps={{
                  maxLength: 7,
                }}
                onChange={(e) => {
                  checkIfNumeric(setFieldValue, e.target.value);
                }}
              />
            </>
          ) : null}
          <Button
            color="secondary"
            variant="contained"
            sx={{
              fontSize: "150%",
              mt: 5,
              borderRadius: "12px",
              py: 1.5,
              mb: 8,
            }}
            fullWidth
            disabled={
              (state.viewTickets.acceptTicket &&
                state.viewTickets.entryCode.length < 5) ||
              loading
            }
            onClick={() =>
              updateStatus(ticket.IDPerson, state.viewTickets.entryCode)
            }
          >
            {state.viewTickets.acceptTicket && loading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Typography
                  sx={{
                    direction: "rtl",
                    fontSize: "85%",
                  }}
                >
                  מעלה בקשה...
                </Typography>
                <CircularProgress
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                  size={20}
                  disableShrink
                  thickness={4}
                />
              </Box>
            ) : (
              <>אשר</>
            )}
          </Button>
        </>
      ) : null}
    </Drawer>
  );
}
