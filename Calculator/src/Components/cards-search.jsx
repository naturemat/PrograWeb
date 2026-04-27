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
import { getAllHeroes } from "../api/heroesApi";
import CharacterCard from "./CharacterCard";
import CharacterPreview from "./CharacterPreview";
import FullCharacterInfo from "./FullCharacterInfo";

function CardsSearch({ setView }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [heroes, setHeroes] = useState([]);
  const [allHeroes, setAllHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [selectedHero, setSelectedHero] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const all = await getAllHeroes();
        setHeroes(all);
        setAllHeroes(all);
      } catch (err) {
        setError("Failed to load heroes");
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setHeroes(allHeroes);
      return;
    }

    const filtered = allHeroes.filter((hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setHeroes(filtered);
  };

  const handleCardClick = (hero) => {
    setSelectedHero(hero);
    setViewMode("preview");
  };

  const handleBack = () => {
    setSelectedHero(null);
    setViewMode("list");
  };

  const handleMoreInfo = () => {
    setViewMode("full");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Heroes Database
        </Typography>
      </Box>

      {/* Search */}
      {viewMode === "list" && (
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
      )}

      {/* Error */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Loading */}
      {loading && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <CircularProgress />
          <Typography mt={2}>Loading heroes...</Typography>
        </Box>
      )}

      {/* GRID RESPONSIVE (CSS GRID REAL) */}
      {viewMode === "list" && !loading && heroes.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)", // 📱 móvil → 2 columnas
              md: "repeat(4, 1fr)", // 💻 desktop → 4 columnas FIJAS
            },
          }}
        >
          {heroes.map((hero) => (
            <CharacterCard
              key={hero.id}
              hero={hero}
              onClick={() => handleCardClick(hero)}
            />
          ))}
        </Box>
      )}

      {/* No results */}
      {viewMode === "list" && !loading && heroes.length === 0 && (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography>No heroes found</Typography>
        </Paper>
      )}

      {/* Preview */}
      {viewMode === "preview" && selectedHero && (
        <CharacterPreview
          hero={selectedHero}
          onMoreInfo={handleMoreInfo}
          onBack={handleBack}
        />
      )}

      {/* Full Info */}
      {viewMode === "full" && selectedHero && (
        <FullCharacterInfo
          hero={selectedHero}
          onBack={handleBack}
          onGoMenu={() => setView(false)}
        />
      )}
    </Container>
  );
}

export default CardsSearch;
