import useGetSteps from "@/lib/hooks/clientticket/useGetSteps";
import useHandleModal from "@/lib/hooks/clientticket/useHandleModal";
import { IAddModal, INilve } from "@/types/ui";
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  useTheme,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { useState } from "react";

export default function AddModal({ open, setOpen }: IAddModal) {
  const { state, steps, isHayal } = useGetSteps();
  const theme = useTheme();
  const [newNilve, setNewNilve] = useState<INilve>({
    humanType: "",
    taasiaType: "",
    id: "",
    firstName: "",
    lastName: "",
  });

  const { handleNewNilveChange, createNilve } = useHandleModal(
    newNilve,
    setNewNilve
  );

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        style: {
          minWidth: "45%",
          maxHeight: "60vh",
          borderRadius: "20px",
        },
      }}
    >
      <DialogContent sx={{ py: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "200%",
              fontWeight: 600,
              color: theme.palette.primary.main,
              mb: 4,
            }}
          >
            הוספת נלווים
          </Typography>

          <Box
            sx={{
              display: state.nilvim.length > 0 ? "flex" : "column",
              gap: "10rem",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Select
                value={newNilve.humanType}
                size="small"
                onChange={(e) =>
                  handleNewNilveChange("humanType", e.target.value)
                }
                sx={{
                  direction: "rtl",
                  "& .MuiInputBase-input": {
                    color: theme.palette.primary.main,
                    fontFamily: "David",
                    fontSize: "110%",
                  },
                  "& .MuiInputBase-input::focus": {
                    border: "1px solid red",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "gray",
                    fontFamily: "David",
                    fontSize: "110%",
                  },
                }}
              >
                <MenuItem value="" disabled sx={{ direction: "rtl" }}>
                  בחר תפקיד
                </MenuItem>
                {steps[0].options.map((opt, ind) => (
                  <MenuItem
                    key={ind}
                    value={opt.optionname}
                    sx={{ direction: "rtl" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                      }}
                    >
                      {opt.icon}
                      {opt.optionname}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              {newNilve.humanType === "עובד תעשייה" ? (
                <Select
                  value={newNilve.taasiaType}
                  size="small"
                  onChange={(e) =>
                    handleNewNilveChange("taasiaType", e.target.value)
                  }
                  sx={{
                    direction: "rtl",
                    "& .MuiInputBase-input": {
                      color: theme.palette.primary.main,
                      fontFamily: "David",
                      fontSize: "110%",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "gray",
                      fontFamily: "David",
                      fontSize: "110%",
                    },
                  }}
                >
                  <MenuItem value="" disabled sx={{ direction: "rtl" }}>
                    בחר תעשייה
                  </MenuItem>
                  {steps[1].options.map((opt, ind) => (
                    <MenuItem
                      key={ind}
                      value={opt.optionname}
                      sx={{ direction: "rtl" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "1rem",
                          alignItems: "center",
                        }}
                      >
                        {opt.icon}
                        {opt.optionname}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              ) : null}

              <TextField
                placeholder={
                  isHayal(newNilve.humanType) ? "מספר אישי" : "תעודת זהות"
                }
                dir="rtl"
                size="small"
                value={newNilve.id}
                onChange={(e) =>
                  handleNewNilveChange("id", e.target.value, true)
                }
                inputProps={{
                  maxLength: isHayal(newNilve.humanType) ? 7 : 9,
                }}
                sx={{
                  direction: "rtl",
                  "& .MuiInputBase-input": {
                    color: theme.palette.primary.main,
                    fontFamily: "David",
                    fontSize: "110%",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "gray",
                    fontFamily: "David",
                    fontSize: "110%",
                  },
                }}
              />
              <TextField
                placeholder="שם פרטי"
                dir="rtl"
                size="small"
                value={newNilve.firstName}
                onChange={(e) =>
                  handleNewNilveChange("firstName", e.target.value)
                }
                sx={{
                  direction: "rtl",
                  "& .MuiInputBase-input": {
                    color: theme.palette.primary.main,
                    fontFamily: "David",
                    fontSize: "110%",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "gray",
                    fontFamily: "David",
                    fontSize: "110%",
                  },
                }}
              />
              <TextField
                placeholder="שם משפחה"
                dir="rtl"
                size="small"
                value={newNilve.lastName}
                onChange={(e) =>
                  handleNewNilveChange("lastName", e.target.value)
                }
                sx={{
                  direction: "rtl",
                  "& .MuiInputBase-input": {
                    color: theme.palette.primary.main,
                    fontFamily: "David",
                    fontSize: "110%",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "gray",
                    fontFamily: "David",
                    fontSize: "110%",
                  },
                }}
              />
              <Button
                onClick={createNilve}
                variant="contained"
                sx={{
                  px: 2,
                  mt: 2,
                  fontFamily: "David",
                }}
              >
                Create
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxWidth: "35%",
              }}
            >
              {state.nilvim.map((nilve: INilve, index: number) => (
                <Paper
                  key={index}
                  elevation={5}
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    background: theme.palette.secondary.main,
                  }}
                >
                  <Box sx={{ color: "white", display: "flex", gap: "0.3rem" }}>
                    <Typography
                      sx={{
                        fontSize: "120%",
                        color: "white",
                      }}
                    >{`${nilve?.firstName} ${nilve?.lastName}`}</Typography>
                    {
                      steps[0].options[
                        steps[0].options.findIndex(
                          (opt) => opt.optionname === nilve?.humanType
                        )
                      ]?.icon
                    }
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
