import { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Button,
  Box,
} from "@mui/material";
import theme from "./theme";
import BasicAddition from "./Components/basicAdittion";
import Calculator from "./Components/calculator";
import CardsSearch from "./Components/cards-search";

function App() {
  const [view, setView] = useState("home");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {view === "addition" ? (
          <BasicAddition setView={setView} />
        ) : view === "calculator" ? (
          <Calculator setView={setView} />
        ) : view === "cards-search" ? (
          <CardsSearch setView={setView} />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "60vh",
              gap: 3,
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Main Menu
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => setView("addition")}
              sx={{ minWidth: 200 }}
            >
              APP 1
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => setView("calculator")}
              sx={{ minWidth: 200 }}
            >
              APP 2
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => setView("cards-search")}
              sx={{ minWidth: 200 }}
            >
              APP 3
            </Button>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
