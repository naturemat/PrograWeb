import { Card, CardMedia, CardContent, Typography } from "@mui/material";

function CharacterCard({ hero, onClick }) {
  const imageUrl =
    hero.image?.url ||
    `https://via.placeholder.com/300x300?text=${encodeURIComponent(hero.name || "Hero")}`;

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        alt={hero.name}
        referrerPolicy="no-referrer"
        sx={{
          height: 200,
          objectFit: "cover",
          backgroundColor: "#f0f0f0",
        }}
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(hero.name)}`;
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontSize: "1rem",
            fontWeight: 600,
            lineHeight: 1.3,
            textAlign: "center",
            color: "text.primary",
          }}
        >
          {hero.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CharacterCard;
