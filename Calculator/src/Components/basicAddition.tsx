import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";
import BackButton from "./BackButton";

interface BasicAdditionProps {
  setView: () => void;
}

export default function BasicAddition({ setView }: BasicAdditionProps) {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [calculationResult, setCalculationResult] = useState<number | null>(null);

  const handleAddition = () => {
    const sum = Number(firstNumber) + Number(secondNumber);
    setCalculationResult(sum);
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          mt: 2,
          borderRadius: 3,
          border: "1px solid rgba(0,0,0,0.06)",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          align="center"
          sx={{
            color: "primary.main",
            fontSize: { xs: "1.5rem", md: "1.75rem" },
          }}
        >
          Basic Addition
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 4,
          }}
        >
          <TextField
            label="Number 1"
            type="number"
            value={firstNumber}
            onChange={(e) => setFirstNumber(e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              sx: {
                backgroundColor: "#fafafa",
                "&:hover": {
                  backgroundColor: "#f5f3f0",
                },
              },
            }}
          />

          <TextField
            label="Number 2"
            type="number"
            value={secondNumber}
            onChange={(e) => setSecondNumber(e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              sx: {
                backgroundColor: "#fafafa",
                "&:hover": {
                  backgroundColor: "#f5f3f0",
                },
              },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleAddition}
            fullWidth
            sx={{
              mt: 1,
              py: 1.6,
              fontSize: "1rem",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(124, 154, 156, 0.2)",
            }}
          >
            Calculate Sum
          </Button>

          {calculationResult !== null && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: "#f0f7f5",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" color="primary.main">
                Result: {calculationResult}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4.5 }}>
          <BackButton onClick={() => setView()} label="Back to Menu" />
        </Box>
      </Paper>
    </Container>
  );
}