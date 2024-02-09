import useGetSteps from "@/lib/hooks/clientticket/useGetSteps";
import { IAddModal, INilve } from "@/types/ui";
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
  MenuItem,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function AddModal({ open }: IAddModal) {
  const { state, setFieldValue, openCloseModal } = useGetSteps();
  const theme = useTheme();

  const [newNilve, setNewNilve] = useState<INilve>({
    humanType: "",
    id: "",
    firstName: "",
    lastName: "",
  });
  const [showNewNilveInput, setShowNewNilveInput] = useState<boolean>(false);

  const handleNewNilveChange = (field: string, value: any) => {
    setNewNilve((prev) => ({ ...prev, [field]: value }));
  };

  const createNilve = () => {
    setFieldValue("nilvim", [...state.nilvim, newNilve]);
    setNewNilve({ humanType: "", id: "", firstName: "", lastName: "" });
    setShowNewNilveInput(false);
  };

  return (
    <Dialog
      open={open}
      onClose={openCloseModal}
      PaperProps={{
        style: { minWidth: "45%", maxHeight: "60vh" },
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
              mb: 2,
            }}
          >
            הוספת נלווים
          </Typography>
          <IconButton
            onClick={() => setShowNewNilveInput(true)}
            color="secondary"
          >
            <AddIcon />
          </IconButton>
          <Box
            sx={{
              display: showNewNilveInput ? "flex" : "column",
              gap: "10rem",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {showNewNilveInput && (
                <>
                  <TextField
                    label="Human Type"
                    value={newNilve.humanType}
                    onChange={(e) =>
                      handleNewNilveChange("humanType", e.target.value)
                    }
                  />
                  <TextField
                    label="ID"
                    value={newNilve.id}
                    onChange={(e) => handleNewNilveChange("id", e.target.value)}
                  />
                  <TextField
                    label="First Name"
                    value={newNilve.firstName}
                    onChange={(e) =>
                      handleNewNilveChange("firstName", e.target.value)
                    }
                  />
                  <TextField
                    label="Last Name"
                    value={newNilve.lastName}
                    onChange={(e) =>
                      handleNewNilveChange("lastName", e.target.value)
                    }
                  />
                  <Button
                    onClick={createNilve}
                    variant="outlined"
                    sx={{
                      px: 2,
                      mt: 2,
                    }}
                  >
                    Create
                  </Button>
                </>
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {state.nilvim.map((nilve: INilve, index: number) => (
                <Paper
                  key={index}
                  elevation={3}
                  sx={{
                    p: 2,
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: theme.palette.secondary.main,
                  }}
                >
                  <Typography
                    sx={{ fontSize: "120%", color: "white" }}
                  >{`${nilve.firstName} ${nilve.lastName}`}</Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
