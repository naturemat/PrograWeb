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
import BasicAddition from "./Components/basicAddition";
import Calculator from "./Components/calculator";
import CardsSearch from "./Components/cards-search";

type ViewType = "home" | "addition" | "calculator" | "cards-search";

function App() {
  const [currentView, setCurrentView] = useState<ViewType>("home");

  const navigateToAddition = () => setCurrentView("addition");
  const navigateToCalculator = () => setCurrentView("calculator");
  const navigateToHeroesSearch = () => setCurrentView("cards-search");
  const navigateToHome = () => setCurrentView("home");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        {currentView === "addition" ? (
          <BasicAddition setView={navigateToHome} />
        ) : currentView === "calculator" ? (
          <Calculator setView={navigateToHome} />
        ) : currentView === "cards-search" ? (
          <CardsSearch setView={navigateToHome} />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "70vh",
              gap: 3.5,
            }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                color: "primary.main",
                textAlign: "center",
              }}
            >
              Main Menu
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={navigateToAddition}
              sx={{
                minWidth: { xs: "100%", sm: 280 },
                py: 1.8,
                fontSize: "1.1rem",
                fontWeight: 500,
                borderRadius: 2,
              }}
            >
              APP 1
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={navigateToCalculator}
              sx={{
                minWidth: { xs: "100%", sm: 280 },
                py: 1.8,
                fontSize: "1.1rem",
                fontWeight: 500,
                borderRadius: 2,
              }}
            >
              APP 2
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={navigateToHeroesSearch}
              sx={{
                minWidth: { xs: "100%", sm: 280 },
                py: 1.8,
                fontSize: "1.1rem",
                fontWeight: 500,
                borderRadius: 2,
              }}
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