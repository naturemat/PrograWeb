import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import BackButton from "./BackButton";

function FullCharacterInfo({ hero, onBack, onGoMenu }) {
  if (!hero) return null;

  const imageUrl =
    hero.image?.url ||
    `https://via.placeholder.com/600x400?text=${encodeURIComponent(hero.name || "Hero")}`;

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
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
      </Paper>

      <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
        {hero.name}
      </Typography>

      {hero.biography?.fullName && hero.biography.fullName !== hero.name && (
        <Typography
          variant="h5"
          color="text.secondary"
          align="center"
          gutterBottom
        >
          {hero.biography.fullName}
        </Typography>
      )}

      {/* Biography Section */}
      <Section title="Biography">
        <InfoItem
          label="Full Name"
          value={hero.biography?.fullName || "Unknown"}
        />
        <InfoItem
          label="Alter Egos"
          value={hero.biography?.alterEgos || "None"}
        />
        <InfoItem
          label="Aliases"
          value={hero.biography?.aliases?.join(", ") || "None"}
        />
        <InfoItem
          label="Place of Birth"
          value={hero.biography?.placeOfBirth || "Unknown"}
        />
        <InfoItem
          label="First Appearance"
          value={hero.biography?.firstAppearance || "Unknown"}
        />
        <InfoItem
          label="Publisher"
          value={hero.biography?.publisher || "Unknown"}
        />
        <InfoItem
          label="Alignment"
          value={formatAlignment(hero.biography?.alignment)}
        />
      </Section>

      {/* Appearance Section */}
      <Section title="Appearance">
        <InfoItem label="Gender" value={hero.appearance?.gender || "Unknown"} />
        <InfoItem label="Race" value={hero.appearance?.race || "Unknown"} />
        <InfoItem
          label="Height"
          value={hero.appearance?.height?.[0] || "Unknown"}
        />
        <InfoItem
          label="Weight"
          value={hero.appearance?.weight?.[0] || "Unknown"}
        />
        <InfoItem
          label="Eye Color"
          value={hero.appearance?.eyeColor || "Unknown"}
        />
        <InfoItem
          label="Hair Color"
          value={hero.appearance?.hairColor || "Unknown"}
        />
      </Section>

      {/* Power Stats Section */}
      <Section title="Power Statistics">
        <PowerStat name="Intelligence" value={hero.powerstats?.intelligence} />
        <PowerStat name="Strength" value={hero.powerstats?.strength} />
        <PowerStat name="Speed" value={hero.powerstats?.speed} />
        <PowerStat name="Durability" value={hero.powerstats?.durability} />
        <PowerStat name="Power" value={hero.powerstats?.power} />
        <PowerStat name="Combat" value={hero.powerstats?.combat} />
      </Section>

      {/* Work Section */}
      <Section title="Work & Occupation">
        <InfoItem
          label="Occupation"
          value={hero.work?.occupation || "Unknown"}
        />
        <InfoItem
          label="Base of Operation"
          value={hero.work?.base || "Unknown"}
        />
      </Section>

      {/* Connections Section */}
      <Section title="Connections">
        <InfoItem
          label="Group Affiliation"
          value={hero.connections?.groupAffiliation || "None"}
        />
        <InfoItem
          label="Relatives"
          value={hero.connections?.relatives || "Unknown"}
        />
      </Section>

      {/* Extra Features Section (if any) */}
      {hero.features && hero.features.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Notable Traits
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {hero.features.map((feature, idx) => (
              <Chip key={idx} label={feature} sx={{ m: 0.5 }} />
            ))}
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 4,
          flexWrap: "wrap",
        }}
      >
        <BackButton onClick={onBack} label="Back to Preview" size="large" />

        <BackButton onClick={onGoMenu} label="Back to Menu" size="large" />
      </Box>

      <Box sx={{ height: 40 }} />
    </Box>
  );
}

// Helper Components
function Section({ title, children }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Paper elevation={1}>{children}</Paper>
    </Box>
  );
}

function InfoItem({ label, value }) {
  return (
    <Box
      sx={{
        p: 2,
        borderBottom: "1px solid #e0e0e0",
        "&:last-child": {
          borderBottom: "none",
        },
        "&:hover": {
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} color="#1976d2">
          {label}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "right", maxWidth: "60%" }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

function PowerStat({ name, value }) {
  let numValue = 0;
  if (value && value !== "null") {
    const parsed = parseInt(value);
    numValue = isNaN(parsed) ? 0 : parsed;
  }
  const percentage = Math.min(Math.max(numValue, 0), 100);

  return (
    <Box
      sx={{
        p: 2,
        borderBottom: "1px solid #e0e0e0",
        "&:last-child": {
          borderBottom: "none",
        },
        "&:hover": {
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} color="#1976d2">
          {name}
        </Typography>
        <Typography variant="body1" fontWeight="bold" color="text.secondary">
          {value || "?"}
        </Typography>
      </Box>
      <Box
        sx={{
          height: 6,
          backgroundColor: "#e0e0e0",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${percentage}%`,
            backgroundColor: getStatColor(percentage),
            transition: "width 0.3s ease",
          }}
        />
      </Box>
    </Box>
  );
}

function getStatColor(value) {
  if (value >= 90) return "#4caf50"; // Green - very high
  if (value >= 75) return "#8bc34a"; // Light green
  if (value >= 60) return "#ffc107"; // Yellow - good
  if (value >= 40) return "#ff9800"; // Orange - average
  return "#f44336"; // Red - low
}

function formatAlignment(alignment) {
  if (!alignment) return "Unknown";
  return alignment.charAt(0).toUpperCase() + alignment.slice(1);
}

export default FullCharacterInfo;
