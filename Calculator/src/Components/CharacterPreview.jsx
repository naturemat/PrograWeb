import { Box, Typography, Button, Chip, Paper } from "@mui/material";
import BackButton from "./BackButton";

function CharacterPreview({ hero, onMoreInfo, onBack }) {
  if (!hero) return null;

  const imageUrl =
    hero.image?.url ||
    `https://via.placeholder.com/400x400?text=${encodeURIComponent(hero.name || "Hero")}`;

  const keyChips = [];

  if (hero.appearance?.race)
    keyChips.push({ label: `Race: ${hero.appearance.race}`, color: "default" });
  if (hero.appearance?.gender)
    keyChips.push({ label: hero.appearance.gender, color: "info" });
  if (hero.biography?.alignment) {
    const alignColor =
      hero.biography.alignment === "good"
        ? "success"
        : hero.biography.alignment === "evil"
          ? "error"
          : "default";
    keyChips.push({
      label:
        hero.biography.alignment.charAt(0).toUpperCase() +
        hero.biography.alignment.slice(1),
      color: alignColor,
    });
  }
  if (hero.biography?.publisher)
    keyChips.push({ label: hero.biography.publisher, color: "secondary" });

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          backgroundColor: "#fff",
          border: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 5 },
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              flex: { xs: "0 0 100%", md: "0 0 40%" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={imageUrl}
              alt={hero.name}
              referrerPolicy="no-referrer"
              style={{
                width: "100%",
                maxHeight: 400,
                objectFit: "contain",
                display: "block",
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/400x400?text=${hero.name}`;
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                lineHeight: 1.2,
                color: "primary.main",
              }}
            >
              {hero.name}
            </Typography>

            {hero.biography?.fullName &&
              hero.biography.fullName !== hero.name && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2.5 }}
                >
                  <strong>Full Name:</strong> {hero.biography.fullName}
                </Typography>
              )}

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 3.5,
                lineHeight: 1.7,
                fontSize: "1rem",
              }}
            >
              {hero.description || `Information about ${hero.name}.`}
            </Typography>

            {keyChips.length > 0 && (
              <Box
                sx={{ mb: 3.5, display: "flex", flexWrap: "wrap", gap: 1.5 }}
              >
                {keyChips.map((chip, idx) => (
                  <Chip
                    key={idx}
                    label={chip.label}
                    color={chip.color}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: 1.5,
                      fontSize: "0.8rem",
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>
            )}

            {(hero.appearance?.height?.[0] || hero.appearance?.weight?.[0]) && (
              <Box sx={{ mb: 3.5 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontStyle: "italic" }}
                >
                  {hero.appearance.height?.[0] &&
                    `Height: ${hero.appearance.height[0]}`}
                  {hero.appearance.height?.[0] &&
                    hero.appearance.weight?.[0] &&
                    " | "}
                  {hero.appearance.weight?.[0] &&
                    `Weight: ${hero.appearance.weight[0]}`}
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onMoreInfo}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 500,
                boxShadow: "0 4px 12px rgba(124, 154, 156, 0.25)",
              }}
            >
              View Full Details
            </Button>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3.5 }}>
        <BackButton onClick={onBack} label="Back to List" />
      </Box>
    </Box>
  );
}

export default CharacterPreview;
