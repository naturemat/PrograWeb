import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllHeroes, Hero } from "../api/heroesApi";
import CharacterCard from "./CharacterCard";
import CharacterPreview from "./CharacterPreview";
import FullCharacterInfo from "./FullCharacterInfo";
import BackButton from "./BackButton";

type ViewMode = "list" | "preview" | "full";

interface CardsSearchProps {
  setView: () => void;
}

function CardsSearch({ setView }: CardsSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedHeroes, setDisplayedHeroes] = useState<Hero[]>([]);
  const [allHeroesData, setAllHeroesData] = useState<Hero[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentViewMode, setCurrentViewMode] = useState<ViewMode>("list");
  const [selectedHeroData, setSelectedHeroData] = useState<Hero | null>(null);

  useEffect(() => {
    const loadHeroesData = async () => {
      try {
        const heroes = await getAllHeroes();
        setDisplayedHeroes(heroes);
        setAllHeroesData(heroes);
      } catch (err) {
        setErrorMessage("Failed to load heroes");
      } finally {
        setIsLoading(false);
      }
    };
    loadHeroesData();
  }, []);

  const handleSearchAction = () => {
    if (!searchQuery.trim()) {
      setDisplayedHeroes(allHeroesData);
      return;
    }

    const filteredHeroes = allHeroesData.filter((hero) =>
      hero.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setDisplayedHeroes(filteredHeroes);
  };

  const handleHeroSelection = (hero: Hero) => {
    setSelectedHeroData(hero);
    setCurrentViewMode("preview");
  };

  const handleGoBack = () => {
    setSelectedHeroData(null);
    setCurrentViewMode("list");
  };

  const handleViewFullDetails = () => {
    setCurrentViewMode("full");
  };

  const handleReturnToMenu = () => {
    setView();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "1.75rem", md: "2.25rem" },
            color: "primary.main",
          }}
        >
          Heroes Database
        </Typography>
      </Box>

      {currentViewMode === "list" && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 5,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            fullWidth
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchAction()}
            InputProps={{
              sx: {
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearchAction}
            disabled={isLoading}
            startIcon={<SearchIcon />}
            sx={{
              minWidth: { xs: "100%", sm: "auto" },
              px: 4,
              boxShadow: "0 4px 12px rgba(124, 154, 156, 0.2)",
            }}
          >
            Search
          </Button>
        </Box>
      )}

      {errorMessage && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
          }}
        >
          {errorMessage}
        </Alert>
      )}

      {isLoading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 10,
          }}
        >
          <CircularProgress
            size={60}
            sx={{
              color: "primary.main",
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            Loading heroes...
          </Typography>
        </Box>
      )}

      {currentViewMode === "list" && !isLoading && displayedHeroes.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gap: 2.5,
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            },
            "@media (max-width:600px)": {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
          }}
        >
          {displayedHeroes.map((hero) => (
            <CharacterCard
              key={hero.my_id}
              hero={hero}
              onClick={() => handleHeroSelection(hero)}
            />
          ))}
        </Box>
      )}

      {currentViewMode === "list" && !isLoading && displayedHeroes.length === 0 && (
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
            border: "1px dashed rgba(0,0,0,0.1)",
            backgroundColor: "#fcfbf9",
          }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            No heroes found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try a different search term
          </Typography>
        </Paper>
      )}

      {currentViewMode === "preview" && selectedHeroData && (
        <CharacterPreview
          hero={selectedHeroData}
          onMoreInfo={handleViewFullDetails}
          onBack={handleGoBack}
        />
      )}

      {currentViewMode === "full" && selectedHeroData && (
        <FullCharacterInfo
          hero={selectedHeroData}
          onGoMenu={handleReturnToMenu}
        />
      )}
    </Container>
  );
}

export default CardsSearch;