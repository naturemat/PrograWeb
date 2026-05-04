import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import BackButton from "./BackButton";
import { safeCalculate } from "../utils/mathUtils";

interface CalculatorButton {
  label: string;
  action: () => void;
  color?: string;
  xs?: number;
}

interface CalculatorProps {
  setView: () => void;
}

function Calculator({ setView }: CalculatorProps) {
  const [displayValue, setDisplayValue] = useState("");

  const appendValue = (value: string) => {
    setDisplayValue((prevValue) => prevValue + value);
  };

  const calculateResult = () => {
    const result = safeCalculate(displayValue);
    setDisplayValue(result.toString());
  };

  const clearDisplay = () => {
    setDisplayValue("");
  };

  const deleteLastCharacter = () => {
    setDisplayValue((prevValue) => prevValue.slice(0, -1));
  };

  const calculatorButtons: CalculatorButton[][] = [
    [
      { label: "D", action: deleteLastCharacter, color: "warning" },
      { label: "/", action: () => appendValue("/") },
      { label: "*", action: () => appendValue("*") },
      { label: "C", action: clearDisplay, color: "error" },
    ],
    [
      { label: "7", action: () => appendValue("7") },
      { label: "8", action: () => appendValue("8") },
      { label: "9", action: () => appendValue("9") },
      { label: "-", action: () => appendValue("-") },
    ],
    [
      { label: "4", action: () => appendValue("4") },
      { label: "5", action: () => appendValue("5") },
      { label: "6", action: () => appendValue("6") },
      { label: "+", action: () => appendValue("+"), color: "primary" },
    ],
    [
      { label: "1", action: () => appendValue("1") },
      { label: "2", action: () => appendValue("2") },
      { label: "3", action: () => appendValue("3") },
      { label: "=", action: calculateResult, color: "success" },
    ],
    [
      { label: "0", action: () => appendValue("0"), xs: 3 },
      { label: ".", action: () => appendValue(".") },
    ],
  ];

  const handleReturnToMenu = () => {
    setView();
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
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
          Calculator
        </Typography>

        <TextField
          fullWidth
          value={displayValue}
          readOnly
          variant="outlined"
          sx={{
            mb: 3,
            backgroundColor: "#f5f3f0",
            "& .MuiInputBase-input": {
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              textAlign: "right",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              fontWeight: 500,
              color: "text.primary",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#ebe8e3",
              },
            },
          }}
        />

        <Grid container spacing={1.5}>
          {calculatorButtons.map((buttonRow, rowIndex) =>
            buttonRow.map((buttonConfig, colIndex) => (
              <Grid item xs={buttonConfig.xs || 3} key={`${rowIndex}-${colIndex}`}>
                <Button
                  fullWidth
                  variant="contained"
                  color={buttonConfig.color || "default"}
                  onClick={buttonConfig.action}
                  sx={{
                    py: { xs: 1.8, md: 2.2 },
                    fontSize: { xs: "1rem", md: "1.25rem" },
                    fontWeight: 600,
                    borderRadius: 2,
                    backgroundColor: (theme) =>
                      buttonConfig.color === "primary"
                        ? theme.palette.primary.main
                        : buttonConfig.color === "secondary"
                          ? theme.palette.secondary.main
                          : buttonConfig.color === "success"
                            ? theme.palette.success.main
                            : buttonConfig.color === "error"
                              ? theme.palette.error.main
                              : buttonConfig.color === "warning"
                                ? theme.palette.warning.main
                                : undefined,
                    "&:hover": {
                      filter: "brightness(0.95)",
                    },
                  }}
                >
                  {buttonConfig.label}
                </Button>
              </Grid>
            )),
          )}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4.5 }}>
          <BackButton onClick={handleReturnToMenu} label="Back to Menu" />
        </Box>
      </Paper>
    </Container>
  );
}

export default Calculator;