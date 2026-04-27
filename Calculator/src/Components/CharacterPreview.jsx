import { Box, Typography, Button, Chip, Paper } from "@mui/material";
import BackButton from "./BackButton";

function CharacterPreview({ hero, onMoreInfo, onBack }) {
  if (!hero) return null;

  const imageUrl =
    hero.image?.url ||
    `https://via.placeholder.com/400x400?text=${encodeURIComponent(hero.name || "Hero")}`;

  // Key attributes to display as chips from Super Hero API
  const keyChips = [];

  // Appearance: race, gender, height, weight
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
      <Paper elevation={2} sx={{ p: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "flex-start",
          }}
        >
          {/* Image */}
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
                maxHeight: 500,
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
                borderRadius: 8,
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/600x400?text=${hero.name}`;
              }}
            />
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {hero.name}
            </Typography>

            {/* Full name if different */}
            {hero.biography?.fullName &&
              hero.biography.fullName !== hero.name && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  <strong>Full Name:</strong> {hero.biography.fullName}
                </Typography>
              )}

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {hero.description || `Information about ${hero.name}.`}
            </Typography>

            {/* Key Info Chips */}
            {keyChips.length > 0 && (
              <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {keyChips.map((chip, idx) => (
                  <Chip
                    key={idx}
                    label={chip.label}
                    color={chip.color}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            )}

            {/* Additional quick info */}
            {(hero.appearance?.height?.[0] || hero.appearance?.weight?.[0]) && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
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

            {/* More Info Button */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onMoreInfo}
            >
              View Full Details
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default CharacterPreview;
