import useGetPrevTicket from "@/lib/hooks/createticket/useGetPrevTicket";
import useReducerHandler from "@/lib/hooks/global/useReducerHandler";
import { IStateTransformed } from "@/types/hooks";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  useTheme,
} from "@mui/material";
export default function SuggestModal({
  ticketData,
}: {
  ticketData: IStateTransformed | undefined;
}) {
  const { state, setFieldValue } = useReducerHandler();
  const { setupStates } = useGetPrevTicket();
  const theme = useTheme();
  return (
    <Dialog
      open={
        Object.keys(ticketData ?? {}).length > 0 && state.suggestionModalOpen
      }
      onClose={() => setFieldValue("suggestionModalOpen", false)}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          px: 5,
          py: 2,
        },
      }}
    >
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "200%",
              px: 10,
              textAlign: "center",
              color: theme.palette.primary.main,
              fontWeight: 600,
              lineHeight: "2.5rem",
            }}
          >
            זיהינו שיש כבר רשומה עם מספר תעודה זה
          </Typography>
          <Typography
            sx={{
              fontSize: "150%",
              direction: "rtl",
              color: theme.palette.primary.main,
            }}
          >
            האם תרצה השלמה אוטומטית?
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "4rem",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{ fontSize: "120%", fontFamily: "David", px: 4 }}
              onClick={() => setFieldValue("suggestionModalOpen", false)}
            >
              לא, תודה
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ fontSize: "120%", fontFamily: "David", px: 4 }}
              onClick={() => {
                setupStates(ticketData);
                setFieldValue("suggestionModalOpen", false);
              }}
            >
              השלם אוטומטית
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
