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

function Calculator({ setView }) {
  const [input, setInput] = useState("");

  const addValue = (value) => {
    setInput((prev) => prev + value);
  };

  const calculate = () => {
    try {
      const result = eval(input);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const removeAll = () => {
    setInput("");
  };

  const deleteNumber = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const buttons = [
    [
      { label: "D", action: deleteNumber, color: "warning" },
      { label: "/", action: () => addValue("/") },
      { label: "*", action: () => addValue("*") },
      { label: "C", action: removeAll, color: "error" },
    ],
    [
      { label: "7", action: () => addValue("7") },
      { label: "8", action: () => addValue("8") },
      { label: "9", action: () => addValue("9") },
      { label: "-", action: () => addValue("-") },
    ],
    [
      { label: "4", action: () => addValue("4") },
      { label: "5", action: () => addValue("5") },
      { label: "6", action: () => addValue("6") },
      { label: "+", action: () => addValue("+"), color: "primary" },
    ],
    [
      { label: "1", action: () => addValue("1") },
      { label: "2", action: () => addValue("2") },
      { label: "3", action: () => addValue("3") },
      { label: "=", action: calculate, color: "success" },
    ],
    [
      { label: "0", action: () => addValue("0"), xs: 3 },
      { label: ".", action: () => addValue(".") },
    ],
  ];

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
          value={input}
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
          {buttons.map((row, rowIdx) =>
            row.map((btn, colIdx) => (
              <Grid item xs={btn.xs || 3} key={`${rowIdx}-${colIdx}`}>
                <Button
                  fullWidth
                  variant="contained"
                  color={btn.color || "default"}
                  onClick={btn.action}
                  sx={{
                    py: { xs: 1.8, md: 2.2 },
                    fontSize: { xs: "1rem", md: "1.25rem" },
                    fontWeight: 600,
                    borderRadius: 2,
                    backgroundColor: (theme) =>
                      btn.color === "primary"
                        ? theme.palette.primary.main
                        : btn.color === "secondary"
                          ? theme.palette.secondary.main
                          : btn.color === "success"
                            ? theme.palette.success.main
                            : btn.color === "error"
                              ? theme.palette.error.main
                              : btn.color === "warning"
                                ? theme.palette.warning.main
                                : undefined,
                    "&:hover": {
                      filter: "brightness(0.95)",
                    },
                  }}
                >
                  {btn.label}
                </Button>
              </Grid>
            )),
          )}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4.5 }}>
          <BackButton onClick={() => setView(false)} label="Back to Menu" />
        </Box>
      </Paper>
    </Container>
  );
}

export default Calculator;
