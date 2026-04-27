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
import BackButton from "./BackButton";

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

      {viewMode === "list" && (
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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
            onClick={handleSearch}
            disabled={loading}
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

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
          }}
        >
          {error}
        </Alert>
      )}

      {loading && (
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

      {viewMode === "list" && !loading && heroes.length > 0 && (
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
          {heroes.map((hero) => (
            <CharacterCard
              key={hero.id}
              hero={hero}
              onClick={() => handleCardClick(hero)}
            />
          ))}
        </Box>
      )}

      {viewMode === "list" && !loading && heroes.length === 0 && (
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

      {viewMode === "preview" && selectedHero && (
        <CharacterPreview
          hero={selectedHero}
          onMoreInfo={handleMoreInfo}
          onBack={handleBack}
        />
      )}

      {viewMode === "full" && selectedHero && (
        <FullCharacterInfo
          hero={selectedHero}
          onGoMenu={() => setView(false)}
        />
      )}
    </Container>
  );
}

export default CardsSearch;
