import { Box, Typography, Card, CardContent, Paper } from "@mui/material";
import BackButton from "./BackButton";

function FullCharacterInfo({ hero, onGoMenu }) {
  if (!hero) return null;

  const imageUrl =
    hero.image?.url ||
    `https://via.placeholder.com/600x400?text=${encodeURIComponent(hero.name || "Hero")}`;

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
          border: "1px solid rgba(0,0,0,0.04)",
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
            borderRadius: 12,
            boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/600x400?text=${hero.name}`;
          }}
        />
      </Paper>

      <Typography
        variant="h3"
        fontWeight="bold"
        align="center"
        gutterBottom
        sx={{
          fontSize: { xs: "2rem", md: "2.75rem" },
          lineHeight: 1.2,
          mb: 0.5,
          color: "primary.main",
        }}
      >
        {hero.name}
      </Typography>

      {hero.biography?.fullName && hero.biography.fullName !== hero.name && (
        <Typography
          variant="h5"
          color="text.secondary"
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            fontWeight: 400,
          }}
        >
          {hero.biography.fullName}
        </Typography>
      )}

      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          border: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "primary.main",
            }}
          >
            Character Overview
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              lineHeight: 1.8,
              fontSize: "1.05rem",
            }}
          >
            {hero.longDescription ||
              hero.description ||
              `Detailed information about ${hero.name}.`}
          </Typography>
        </CardContent>
      </Card>

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

      <Section title="Power Statistics">
        <PowerStat name="Intelligence" value={hero.powerstats?.intelligence} />
        <PowerStat name="Strength" value={hero.powerstats?.strength} />
        <PowerStat name="Speed" value={hero.powerstats?.speed} />
        <PowerStat name="Durability" value={hero.powerstats?.durability} />
        <PowerStat name="Power" value={hero.powerstats?.power} />
        <PowerStat name="Combat" value={hero.powerstats?.combat} />
      </Section>

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

      {hero.features && hero.features.length > 0 && (
        <Box sx={{ mt: 5 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: "1.5rem",
            }}
          >
            Notable Traits
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            {hero.features.map((feature, idx) => (
              <Paper
                key={idx}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: "primary.light",
                  color: "primary.contrastText",
                  fontWeight: 500,
                }}
              >
                {feature}
              </Paper>
            ))}
          </Box>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4.5 }}>
        <BackButton onClick={onGoMenu} label="Back to Menu" />
      </Box>

      <Box sx={{ height: 40 }} />
    </Box>
  );
}

function Section({ title, children }) {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{
          mb: 2.5,
          fontSize: "1.5rem",
          color: "text.primary",
        }}
      >
        {title}
      </Typography>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid rgba(0,0,0,0.06)",
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}

function InfoItem({ label, value }) {
  return (
    <Box
      sx={{
        p: 2.5,
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        backgroundColor: "#fff",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: "#fafafa",
        },
        "&:last-child": {
          borderBottom: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            color: "primary.dark",
            fontSize: "1rem",
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            textAlign: "right",
            maxWidth: "65%",
            wordBreak: "break-word",
            fontSize: "0.95rem",
          }}
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
        p: 2.5,
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        backgroundColor: "#fff",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: "#fafafa",
        },
        "&:last-child": {
          borderBottom: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            color: "primary.dark",
            fontSize: "1rem",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.secondary"
          sx={{
            fontSize: "1rem",
          }}
        >
          {value || "?"}
        </Typography>
      </Box>
      <Box
        sx={{
          height: 8,
          backgroundColor: "#f0f0f0",
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${percentage}%`,
            backgroundColor: getStatColor(percentage),
            transition: "width 0.4s ease",
            borderRadius: 4,
          }}
        />
      </Box>
    </Box>
  );
}

function getStatColor(value) {
  if (value >= 90) return "#81c784";
  if (value >= 75) return "#a5d6a7";
  if (value >= 60) return "#ffb74d";
  if (value >= 40) return "#ff8a65";
  return "#e57373";
}

function formatAlignment(alignment) {
  if (!alignment) return "Unknown";
  return alignment.charAt(0).toUpperCase() + alignment.slice(1);
}

export default FullCharacterInfo;
