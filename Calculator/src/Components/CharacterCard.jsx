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
        border: '1px solid rgba(0,0,0,0.04)',
        backgroundColor: '#fff',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 8px 24px rgba(124, 154, 156, 0.12)',
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
          objectFit: 'cover',
          backgroundColor: '#f5f3f0',
          transition: 'opacity 0.3s ease',
          '&:hover': {
            opacity: 0.95,
          },
        }}
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(hero.name)}`;
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#fcfbf9',
          pt: 2,
          pb: 2,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.3,
            textAlign: 'center',
            color: 'text.primary',
            letterSpacing: '0.01em',
          }}
        >
          {hero.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CharacterCard;
