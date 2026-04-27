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
      // eslint-disable-next-line no-eval
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

  // Calculator buttons: each row is an array of button labels or objects
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
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Calculator
        </Typography>

        {/* Display */}
        <TextField
          fullWidth
          value={input}
          readOnly
          variant="outlined"
          sx={{
            mb: 3,
            "& input": {
              fontSize: "1.5rem",
              textAlign: "right",
              fontFamily: "monospace",
            },
          }}
        />

        {/* Buttons Grid */}
        <Grid container spacing={1}>
          {buttons.map((row, rowIdx) =>
            row.map((btn, colIdx) => (
              <Grid item xs={btn.xs || 3} key={`${rowIdx}-${colIdx}`}>
                <Button
                  fullWidth
                  variant="contained"
                  color={btn.color || "default"}
                  onClick={btn.action}
                  sx={{
                    py: 2,
                    fontSize: "1.2rem",
                    fontWeight: 600,
                  }}
                >
                  {btn.label}
                </Button>
              </Grid>
            )),
          )}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <BackButton onClick={() => setView(false)} label="Back to Menu" />
        </Box>
      </Paper>
    </Container>
  );
}

export default Calculator;
