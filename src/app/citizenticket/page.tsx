"use client";

import useGetSteps from "@/lib/hooks/clientticket/useGetSteps";
import useHandleDates from "@/lib/hooks/clientticket/useHandleDates";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Badge,
  Box,
  Button,
  Grid,
  MenuItem,
  MobileStepper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import AddModal from "./addmodal";
import { INilve } from "@/types/ui";

export default function ClientTicket() {
  const {
    state,
    setFieldValue,
    getFieldValue,
    nextStep,
    previousStep,
    steps,
    openCloseModal,
  } = useGetSteps();
  const { today, maxDate, setToday } = useHandleDates();
  const currentStep = steps[state.currentStep];

  const handleInputChange = (fieldPath: string, value: string) => {
    setFieldValue(fieldPath, value);
  };
  const theme = useTheme();

  useEffect(() => {
    const handleNextStep = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        nextStep();
      }
    };
    window.addEventListener("keydown", handleNextStep);
    return () => {
      window.removeEventListener("keydown", handleNextStep);
    };
  }, [nextStep]);
  return (
    <>
      <AddModal open={state["modalOpen"]} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          background: theme.palette.primary.main,
        }}
      >
        <MobileStepper
          variant="dots"
          steps={steps.length}
          position="static"
          activeStep={steps.indexOf(currentStep)}
          dir="rtl"
          sx={{
            height: "5vh",
            background: theme.palette.primary.main,
            ".MuiMobileStepper-dot": {
              backgroundColor: "white",
            },
            ".MuiMobileStepper-dotActive": {
              backgroundColor: theme.palette.secondary.main,
            },
            width: "auto",
          }}
          nextButton={null}
          backButton={
            steps.indexOf(currentStep) !== 0 ? (
              <Button
                sx={{
                  transition: "all 0.3s ease-in",
                  fontSize: "130%",
                  color: "white",
                  position: "absolute",
                  right: 60,
                  fontFamily: "Assistant",
                  fontWeight: 600,
                  "&:hover": {
                    color: theme.palette.secondary.main,
                  },
                }}
                onClick={previousStep}
              >
                <ArrowForwardIosIcon sx={{ ml: 1 }} />
                חזור אחורה
              </Button>
            ) : null
          }
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          sx={{
            fontSize: "150%",
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          בקשה לאישור כניסה
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: 20,
        }}
      >
        <Typography
          sx={{
            fontSize: "230%",
            color: theme.palette.primary.main,
            direction: "rtl",
            fontWeight: 600,
          }}
        >
          {state["requestFor"] < 3 && state["currentStep"] == 2
            ? "הזן מספר אישי"
            : currentStep.name}
        </Typography>
        {!currentStep.options ? (
          <>
            {currentStep.twoFields ? (
              <>
                <TextField
                  variant="standard"
                  sx={{
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: theme.palette.primary.main,
                      fontFamily: "Assistant",
                      fontSize: "130%",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "gray",
                      fontFamily: "Assistant",
                      fontSize: "110%",
                    },
                  }}
                  placeholder="שם פרטי"
                  dir="rtl"
                  value={state.fullName.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("fullName.firstName", e.target.value)
                  }
                />
                <TextField
                  variant="standard"
                  sx={{
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: theme.palette.primary.main,
                      fontFamily: "Assistant",
                      fontSize: "130%",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "gray",
                      fontFamily: "Assistant",
                      fontSize: "110%",
                    },
                  }}
                  placeholder="שם משפחה"
                  dir="rtl"
                  value={state.fullName.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("fullName.lastName", e.target.value)
                  }
                />
              </>
            ) : null}
            {currentStep.isBig ? (
              <TextField
                variant="filled"
                sx={{
                  mt: 2,
                  minWidth: "30%",
                  "& .MuiInputBase-input": {
                    color: theme.palette.primary.main,
                    fontFamily: "Assistant",
                    fontSize: "110%",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "gray",
                    fontFamily: "Assistant",
                    fontSize: "110%",
                  },
                }}
                dir="rtl"
                multiline
                minRows={4}
                value={state[currentStep.fieldName]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(currentStep.fieldName, e.target.value)
                }
              />
            ) : !currentStep.twoFields ? (
              currentStep.isRehev ? (
                <>
                  <TextField
                    variant="standard"
                    placeholder="מספר רכב"
                    sx={{
                      mt: 2,
                      "& .MuiInputBase-input": {
                        color: theme.palette.primary.main,
                        fontFamily: "Assistant",
                        fontSize: "130%",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "gray",
                        fontFamily: "Assistant",
                        fontSize: "110%",
                      },
                    }}
                    inputProps={{
                      maxLength: 10,
                    }}
                    dir="rtl"
                    value={state[currentStep.fieldName].vehicleNum}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(
                        "vehicleDetails.vehicleNum",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    variant="standard"
                    placeholder="צבע הרכב"
                    sx={{
                      mt: 2,
                      "& .MuiInputBase-input": {
                        color: theme.palette.primary.main,
                        fontFamily: "Assistant",
                        fontSize: "130%",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "gray",
                        fontFamily: "Assistant",
                        fontSize: "110%",
                      },
                    }}
                    inputProps={{
                      maxLength: 10,
                    }}
                    dir="rtl"
                    value={state[currentStep.fieldName].vehicleCol}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(
                        "vehicleDetails.vehicleCol",
                        e.target.value
                      )
                    }
                  />
                  <Select
                    variant="standard"
                    sx={{
                      mt: 2,
                      fontFamily: "Assistant",
                      width: "16rem",
                      "& .MuiInputBase-input": {
                        color: theme.palette.primary.main,
                        fontFamily: "Assistant",
                        fontSize: "130%",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "gray",
                        fontFamily: "Assistant",
                        fontSize: "110%",
                      },
                    }}
                    value={state[currentStep.fieldName].vehicleType}
                    onChange={(e: SelectChangeEvent<string>) => {
                      handleInputChange(
                        "vehicleDetails.vehicleType",
                        e.target.value
                      );
                    }}
                  >
                    <MenuItem value="" disabled defaultChecked>
                      סוג רכב
                    </MenuItem>
                    <MenuItem value="Lambo">Lambo</MenuItem>
                    <MenuItem value="Honda">Honda</MenuItem>
                    <MenuItem value="Hyundai">Hyundai</MenuItem>
                    <MenuItem value="Toyota">Toyota!</MenuItem>
                  </Select>
                </>
              ) : currentStep.isMelave ? (
                <>
                  <TextField
                    variant="standard"
                    placeholder="מספר אישי"
                    sx={{
                      mt: 2,
                      "& .MuiInputBase-input": {
                        color: theme.palette.primary.main,
                        fontFamily: "Assistant",
                        fontSize: "130%",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "gray",
                        fontFamily: "Assistant",
                        fontSize: "110%",
                      },
                    }}
                    inputProps={{
                      maxLength: 10,
                    }}
                    dir="rtl"
                    value={state[currentStep.fieldName].misparIshi}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(
                        "escortDetails.misparIshi",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    variant="standard"
                    placeholder="שם מלא"
                    sx={{
                      mt: 2,
                      "& .MuiInputBase-input": {
                        color: theme.palette.primary.main,
                        fontFamily: "Assistant",
                        fontSize: "130%",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "gray",
                        fontFamily: "Assistant",
                        fontSize: "110%",
                      },
                    }}
                    inputProps={{
                      maxLength: 10,
                    }}
                    dir="rtl"
                    value={state[currentStep.fieldName].name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("escortDetails.name", e.target.value)
                    }
                  />
                  <TextField
                    variant="standard"
                    placeholder="טלפון"
                    sx={{
                      mt: 2,
                      "& .MuiInputBase-input": {
                        color: theme.palette.primary.main,
                        fontFamily: "Assistant",
                        fontSize: "130%",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "gray",
                        fontFamily: "Assistant",
                        fontSize: "110%",
                      },
                    }}
                    inputProps={{
                      maxLength: 10,
                    }}
                    dir="rtl"
                    value={state[currentStep.fieldName].phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("escortDetails.phone", e.target.value)
                    }
                  />
                </>
              ) : !currentStep.isDate && !currentStep.isNilvim ? (
                <TextField
                  variant="standard"
                  sx={{
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: theme.palette.primary.main,
                      fontFamily: "Assistant",
                      fontSize: "130%",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "gray",
                      fontFamily: "Assistant",
                      fontSize: "110%",
                    },
                  }}
                  inputProps={{
                    maxLength: 10,
                  }}
                  dir="rtl"
                  value={state[currentStep.fieldName]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(currentStep.fieldName, e.target.value)
                  }
                />
              ) : null
            ) : null}
          </>
        ) : null}
        {currentStep.isDate ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                mt: 2,
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              <Typography>-מ</Typography>
              <TextField
                type="date"
                value={state[currentStep.fieldName].startDate}
                defaultValue={today}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setToday(e.target.value);
                  handleInputChange("approvalPeriod.startDate", e.target.value);
                  handleInputChange("approvalPeriod.endDate", e.target.value);
                }}
                sx={{ mx: 1 }}
              />
              <Typography>-עד ל</Typography>
              <TextField
                type="date"
                value={state[currentStep.fieldName].endDate}
                defaultValue={today}
                inputProps={{
                  min: today,
                  max: maxDate,
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputChange("approvalPeriod.endDate", e.target.value);
                }}
                sx={{ mx: 1 }}
              />
            </Box>
            <Typography
              sx={{
                direction: "rtl",
                mt: 2,
                color: theme.palette.primary.main,
                fontSize: "120%",
              }}
            >
              אישור ל-
              {Math.round(
                (new Date(getFieldValue("approvalPeriod").endDate).getTime() -
                  new Date(
                    getFieldValue("approvalPeriod").startDate
                  ).getTime()) /
                  (1000 * 60 * 60 * 24)
              ) + 1 || 1}{" "}
              ימים
            </Typography>
          </Box>
        ) : null}
        {currentStep.options ? (
          <Grid
            container
            justifyContent="center"
            direction="row-reverse"
            spacing={2}
            sx={{ my: 2 }}
          >
            {currentStep.options.map((opt) => (
              <Grid
                key={opt.optionname}
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
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
                      right: "10%",
                      border: `2px solid ${theme.palette.background.paper}`,
                      padding: "0 4px",
                    },
                  }}
                  invisible={
                    currentStep.options.indexOf(opt) !=
                    state[currentStep.fieldName]
                  }
                >
                  <Button
                    variant="outlined"
                    sx={{
                      px: 8,
                      minWidth: "20%",
                      width: "10vw",
                      borderRadius: "100px",
                      height: "20vh",
                      maxHeight: "20vh",
                    }}
                    onClick={() => {
                      handleInputChange(
                        currentStep.fieldName,
                        currentStep.options.indexOf(opt).toString()
                      );
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {opt.icon}
                      <Typography
                        sx={{
                          whiteSpace: "nowrap",
                          fontSize: "180%",
                        }}
                      >
                        {opt.optionname}
                      </Typography>
                    </Box>
                  </Button>
                </Badge>
              </Grid>
            ))}
          </Grid>
        ) : null}
        {currentStep.isNilvim ? (
          <>
            {state[currentStep.fieldName].map(
              (nilve: INilve, index: number) => (
                <Typography key={index}>Nilve</Typography>
              )
            )}
            <Button
              sx={{
                fontFamily: "Assistant",
                fontSize: "150%",
                background: theme.palette.primary.main,
                px: 2,
                my: 2,
              }}
              onClick={openCloseModal}
              variant="contained"
            >
              הוספת נלווים
            </Button>
          </>
        ) : null}
        <Button
          sx={{
            fontFamily: "Assistant",
            fontSize: "150%",
            background: theme.palette.secondary.main,
            mt: 3,
            px: 10,
          }}
          onClick={nextStep}
          variant="contained"
        >
          {steps.indexOf(currentStep) === steps.length - 1 ? "הגש" : "המשך"}
        </Button>
      </Box>
    </>
  );
}
