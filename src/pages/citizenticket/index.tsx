"use client";

import useReducerHandler from "@/lib/hooks/clientticket/useReducerHandler";
import useHandleDates from "@/lib/hooks/clientticket/useHandleDates";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Autocomplete,
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  MobileStepper,
  Paper,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode, useState } from "react";
import AddModal from "./addmodal";
import { INilve } from "@/types/ui";
import usePassive from "@/lib/hooks/clientticket/usePassive";
import useGetCars from "@/lib/hooks/clientticket/useGetCars";
import { ICars } from "@/types/api";
import useGetSoldier from "@/lib/hooks/clientticket/useGetSoldier";
import useGetPrevTicket from "@/lib/hooks/clientticket/useGetPrevTicket";
import SuggestModal from "./suggestmodal";

export default function ClientTicket() {
  const {
    state,
    getFieldValue,
    nextStep,
    previousStep,
    steps,
    isValid,
    isHayal,
    getSikum,
    handleInputChange,
    setFieldValue,
    loading,
  } = useReducerHandler();
  const sikum = getSikum();
  const [open, setOpen] = useState<boolean>(false);
  const { today, maxDate, setToday, maxTodayDate, todayInit } =
    useHandleDates();
  const currentStep = steps[state.currentStep];
  const { data: cars } = useGetCars();
  const { getSoldier, loading: soldierLoading } = useGetSoldier();
  const { getPreviousTicket, data: previousTicket } = useGetPrevTicket();
  const theme = useTheme();
  usePassive(open);

  return (
    <>
      <AddModal open={open} setOpen={setOpen} />
      <SuggestModal ticketData={previousTicket} />
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
                  fontFamily: "David",
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
          mt: steps.indexOf(currentStep) === steps.length - 1 ? 5 : 20,
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
          {isHayal() && state.currentStep == 2
            ? "הזן מספר אישי"
            : currentStep.name}
        </Typography>
        {!currentStep.options ? (
          <>
            {currentStep.twoFields ? (
              <>
                <TextField
                  autoFocus
                  variant="standard"
                  sx={{
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: theme.palette.primary.main,
                      fontFamily: "David",
                      fontSize: "130%",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "gray",
                      fontFamily: "David",
                      fontSize: "110%",
                    },
                  }}
                  placeholder="שם פרטי"
                  inputProps={{
                    maxLength: 10,
                  }}
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
                      fontFamily: "David",
                      fontSize: "130%",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "gray",
                      fontFamily: "David",
                      fontSize: "110%",
                    },
                  }}
                  placeholder="שם משפחה"
                  inputProps={{
                    maxLength: 10,
                  }}
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
                autoFocus
                variant="filled"
                sx={{
                  mt: 2,
                  minWidth: "30%",
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
                dir="rtl"
                multiline
                minRows={4}
                value={state[currentStep.fieldName]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputChange(currentStep.fieldName, e.target.value);
                }}
              />
            ) : !currentStep.twoFields ? (
              currentStep.isRehev ? (
                <>
                  <TextField
                    variant="standard"
                    placeholder="מספר רכב"
                    autoFocus
                    sx={{
                      mt: 2,
                      "& .MuiInputBase-input": {
                        color: theme.palette.primary.main,
                        fontFamily: "David",
                        fontSize: "130%",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "gray",
                        fontFamily: "David",
                        fontSize: "110%",
                      },
                    }}
                    inputProps={{
                      maxLength: 8,
                    }}
                    dir="rtl"
                    value={state[currentStep.fieldName].vehicleNum}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(
                        "vehicleDetails.vehicleNum",
                        e.target.value,
                        true
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
                        fontFamily: "David",
                        fontSize: "130%",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "gray",
                        fontFamily: "David",
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

                  <Autocomplete
                    sx={{
                      mt: 2,
                      fontFamily: "David",
                      width: "14rem",
                      color: "red",
                      "& .MuiInputBase-input": {
                        color: theme.palette.primary.main,
                        fontFamily: "David",
                        fontSize: "130%",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "gray",
                        fontFamily: "David",
                        fontSize: "110%",
                      },
                    }}
                    value={
                      cars?.find(
                        (car) =>
                          car.englishName ===
                          state[currentStep.fieldName].vehicleType
                      ) || null
                    }
                    onChange={(_, newValue) => {
                      handleInputChange(
                        "vehicleDetails.vehicleType",
                        newValue?.englishName ?? ""
                      );
                    }}
                    getOptionLabel={(option) => option.englishName ?? ""}
                    inputValue={state.searchValue}
                    onInputChange={(_, newInputValue) => {
                      setFieldValue("searchValue", newInputValue);
                    }}
                    options={cars ?? []}
                    disabled={!cars}
                    filterOptions={(options, { inputValue }) => {
                      return options.filter(
                        (option) =>
                          option.englishName
                            .toLowerCase()
                            .includes(inputValue.toLowerCase()) ||
                          option.hebrewName
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                      );
                    }}
                    renderOption={(props, option: ICars) => (
                      <Box component="li" {...props}>
                        <Typography
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: "120%",
                          }}
                        >
                          {option.englishName} |{" "}
                          <span style={{ color: theme.palette.secondary.main }}>
                            {option.hebrewName}
                          </span>
                        </Typography>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <Tooltip
                        title="ניתן להקליד שם גם בעברית וגם באנגלית"
                        placement="right"
                        componentsProps={{
                          tooltip: {
                            sx: {
                              fontSize: "110%",
                              background: theme.palette.primary.main,
                              p: 2,
                              ml: 2,
                              mb: 1,
                            },
                          },
                          arrow: {
                            sx: {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                        arrow
                      >
                        <TextField
                          {...params}
                          placeholder="סוג רכב"
                          dir="rtl"
                          variant="standard"
                          sx={{
                            fontFamily: "David",
                            "& .MuiInputBase-input": {
                              color: theme.palette.primary.main,
                              fontFamily: "David",
                              fontSize: "130%",
                            },
                            "& .MuiInputBase-root::placeholder": {
                              color: "gray",
                              fontFamily: "David",
                              fontSize: "110%",
                            },
                          }}
                        />
                      </Tooltip>
                    )}
                  />
                </>
              ) : currentStep.isMelave ? (
                <>
                  <TextField
                    variant="standard"
                    autoFocus
                    placeholder="מספר אישי"
                    sx={{
                      mt: 2,
                      "& .MuiInputBase-input": {
                        color: theme.palette.primary.main,
                        fontFamily: "David",
                        fontSize: "130%",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "gray",
                        fontFamily: "David",
                        fontSize: "110%",
                      },
                    }}
                    inputProps={{
                      maxLength: 7,
                    }}
                    dir="rtl"
                    value={state.escortDetails.misparIshi}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(
                        "escortDetails.misparIshi",
                        e.target.value,
                        true
                      );
                      if (state.escortDetails.misparIshi?.length === 6)
                        getSoldier(e.target.value);
                    }}
                  />
                  <TextField
                    variant="standard"
                    placeholder="שם פרטי"
                    sx={{
                      mt: 2,
                      "& .MuiInputBase-input": {
                        color: theme.palette.primary.main,
                        fontFamily: "David",
                        fontSize: "130%",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "gray",
                        fontFamily: "David",
                        fontSize: "110%",
                      },
                    }}
                    inputProps={{
                      maxLength: 10,
                    }}
                    dir="rtl"
                    disabled={soldierLoading}
                    value={state.escortDetails.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(
                        "escortDetails.firstName",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    variant="standard"
                    placeholder="שם משפחה"
                    sx={{
                      mt: 2,
                      "& .MuiInputBase-input": {
                        color: theme.palette.primary.main,
                        fontFamily: "David",
                        fontSize: "130%",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "gray",
                        fontFamily: "David",
                        fontSize: "110%",
                      },
                    }}
                    inputProps={{
                      maxLength: 10,
                    }}
                    dir="rtl"
                    disabled={soldierLoading}
                    value={state.escortDetails.lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(
                        "escortDetails.lastName",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    variant="standard"
                    placeholder="טלפון (לדוגמא 0536022017)"
                    sx={{
                      mt: 2,
                      "& .MuiInputBase-input": {
                        color: theme.palette.primary.main,
                        fontFamily: "David",
                        fontSize: "130%",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "gray",
                        fontFamily: "David",
                        fontSize: "110%",
                      },
                    }}
                    inputProps={{
                      maxLength: 10,
                    }}
                    dir="rtl"
                    disabled={soldierLoading}
                    value={state.escortDetails.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(
                        "escortDetails.phone",
                        e.target.value,
                        true
                      )
                    }
                  />
                </>
              ) : !currentStep.isDate &&
                !currentStep.isNilvim &&
                !currentStep.isSikum ? (
                <TextField
                  variant="standard"
                  sx={{
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: theme.palette.primary.main,
                      fontFamily: "David",
                      fontSize: "130%",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "gray",
                      fontFamily: "David",
                      fontSize: "110%",
                    },
                  }}
                  type="text"
                  autoFocus
                  inputProps={{
                    maxLength: currentStep.isTz ? (isHayal() ? 8 : 9) : 50,
                  }}
                  dir="rtl"
                  value={state[currentStep.fieldName]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(
                      currentStep.fieldName,
                      e.target.value,
                      currentStep.isTz
                    );
                    if (
                      !currentStep.isTz ||
                      e.target.value.length < (isHayal() ? 7 : 9)
                    )
                      return;
                    setFieldValue("suggestionModalOpen", true);
                    getPreviousTicket(e.target.value, isHayal());
                  }}
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
                inputProps={{
                  min: todayInit,
                  max: maxTodayDate,
                }}
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
                inputProps={{
                  min: today,
                  max: maxDate,
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputChange("approvalPeriod.startDate", today);
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
                      right: "13%",
                      border: `2px solid ${theme.palette.background.paper}`,
                      padding: "0 4px",
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "30px",
                    },
                  }}
                  invisible={state[currentStep.fieldName] !== opt.optionname}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      px: 8,
                      minWidth: "20%",
                      width: "12rem",
                      borderRadius: "100px",
                      height: "12rem",
                      maxHeight: "12rem",
                    }}
                    onClick={() => {
                      handleInputChange(currentStep.fieldName, opt.optionname);
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
            {state.nilvim.length > 0 ? (
              <FormControl sx={{ minWidth: "8.5%", my: 2 }}>
                <InputLabel
                  id="vehicleTypeLabel"
                  sx={{
                    fontFamily: "David",
                    color: theme.palette.primary.main,
                    fontSize: "130%",
                    textAlign: "right",
                    width: "80%",
                  }}
                >
                  רשימת נלווים
                </InputLabel>
                <TextField
                  select
                  variant="outlined"
                  value=""
                  sx={{ minWidth: "20%" }}
                >
                  {state[currentStep.fieldName].map(
                    (nilve: INilve, index: number) => (
                      <MenuItem
                        key={index}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Paper
                          elevation={5}
                          sx={{
                            p: 2,
                            my: 2,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: theme.palette.secondary.main,
                          }}
                        >
                          <Box
                            sx={{
                              color: "white",
                              display: "flex",
                              gap: "0.3rem",
                            }}
                          >
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
                      </MenuItem>
                    )
                  )}
                </TextField>
              </FormControl>
            ) : null}
            <Button
              sx={{
                fontFamily: "David",
                fontSize: "150%",
                background: theme.palette.primary.main,
                px: 6,
                my: 2,
              }}
              onClick={() => {
                setOpen(true);
              }}
              variant="contained"
            >
              הוספת נלווים
            </Button>
            <Divider
              sx={{
                width: "8.3%",
                fontSize: "120%",
                opacity: 0.8,
                "&:before": { borderColor: theme.palette.secondary.main },
                "&:after": { borderColor: theme.palette.secondary.main },
                color: theme.palette.primary.main,
              }}
            >
              או
            </Divider>
          </>
        ) : null}
        {currentStep.isSikum ? (
          <Grid
            container
            direction="row-reverse"
            alignItems="center"
            spacing={2}
            sx={{ maxWidth: "50%" }}
          >
            {sikum.map((entry, index) => (
              <Grid
                item
                xs={8}
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "130%",
                    ml: 3,
                    whiteSpace: "nowrap",
                    color: theme.palette.primary.main,
                  }}
                >
                  :{Object.keys(entry)[0]}
                </Typography>
                {typeof Object.values(entry)[0] === "object" ? (
                  Object.entries(
                    Object.values(entry)[0] as Record<string, INilve | string>
                  ).map(([label, value], idx) => (
                    <Box key={idx}>
                      <Box
                        sx={{
                          color: theme.palette.secondary.main,
                          direction: "rtl",
                          whiteSpace: "nowrap",
                          ml: 3,
                          fontSize: "105%",
                        }}
                      >
                        {typeof value === "object" ? (
                          <Typography>{`${value.firstName} ${value.lastName}  ${
                            (Object.values(entry)[0].length as number) - 1 !==
                            idx
                              ? ","
                              : ""
                          }`}</Typography>
                        ) : (
                          <>
                            {`${label}:`}
                            <Typography
                              sx={{
                                fontSize: "105%",
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                              }}
                            >{`${value}`}</Typography>
                          </>
                        )}
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography sx={{ color: theme.palette.secondary.main }}>
                    {Object.values(entry)[0] as ReactNode}
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
        ) : null}
        <Button
          sx={{
            fontFamily: "David",
            fontSize: "150%",
            background: theme.palette.secondary.main,
            mt: 3,
            px: 10,
            mb: 5,
          }}
          onClick={nextStep}
          disabled={!isValid(true) || loading}
          variant="contained"
        >
          {loading ? (
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
                  color: theme.palette.secondary.main,
                }}
                size={20}
                disableShrink
                thickness={4}
              />
            </Box>
          ) : (
            <>
              {steps.indexOf(currentStep) === steps.length - 1 ? "הגש" : "המשך"}
            </>
          )}
        </Button>
      </Box>
    </>
  );
}
