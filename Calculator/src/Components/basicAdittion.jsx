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

export default function BasicAddition({ setView }) {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");

  const handleSum = () => {
    const sum = Number(number1) + Number(number2);
    alert("Result: " + sum);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Basic Addition
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
          <TextField
            label="Number 1"
            type="number"
            value={number1}
            onChange={(e) => setNumber1(e.target.value)}
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Number 2"
            type="number"
            value={number2}
            onChange={(e) => setNumber2(e.target.value)}
            fullWidth
            variant="outlined"
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSum}
            fullWidth
          >
            Calculate Sum
          </Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <BackButton onClick={() => setView(false)} label="Back to Menu" />
        </Box>
      </Paper>
    </Container>
  );
}
