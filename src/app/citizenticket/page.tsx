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
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

export default function ClientTicket() {
  const { state, setFieldValue, getFieldValue, nextStep, previousStep, steps } =
    useGetSteps();
  const { todayFormat, maxDateFormat } = useHandleDates();
  const currentStep = steps[state.currentStep];

  const handleInputChange = (field: string, value: string) => {
    const [parentKey, childKey] = field.split(".");
    if (childKey) {
      setFieldValue(parentKey, {
        ...state[parentKey],
        [childKey]: value,
      });
    } else {
      setFieldValue(field, value);
    }
  };
  const theme = useTheme();
  return (
    <>
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
      <Typography sx={{ fontSize: "150%", color: theme.palette.primary.main }}>
        בקשה לאישור כניסה - אזרח
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: 20,
        }}
      >
        <Typography
          sx={{ fontSize: "230%", color: theme.palette.primary.main }}
        >
          {currentStep.name}
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
                  onChange={(e) =>
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
                  onChange={(e) =>
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
                onChange={(e) =>
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
                    onChange={(e) =>
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
                    onChange={(e) =>
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
                      width: "15%",
                    }}
                    value={state[currentStep.fieldName].vehicleType}
                    onChange={(e) => {
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
                    onChange={(e) =>
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
                    onChange={(e) =>
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
                    onChange={(e) =>
                      handleInputChange("escortDetails.phone", e.target.value)
                    }
                  />
                </>
              ) : !currentStep.isDate ? (
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
                  onChange={(e) =>
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
              mt: 2,
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <Typography>-מ</Typography>
            <TextField
              type="date"
              value={state[currentStep.fieldName].startDate}
              defaultValue={todayFormat}
              onChange={(e) =>
                handleInputChange("approvalPeriod.startDate", e.target.value)
              }
              sx={{ mx: 1 }}
            />
            <Typography>-עד ל</Typography>
            <TextField
              type="date"
              value={state[currentStep.fieldName].endDate}
              defaultValue={maxDateFormat}
              inputProps={{
                min: todayFormat,
                max: maxDateFormat,
              }}
              onChange={(e) =>
                handleInputChange("approvalPeriod.endDate", e.target.value)
              }
              sx={{ mx: 1 }}
            />
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
                      top: 30,
                      right: 20,
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
                      width: "10rem",
                      borderRadius: "100px",
                      height: "18vh",
                      maxHeight: "18vh",
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
