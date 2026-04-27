import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BackButton({ onClick, label = "← Back", size = "medium", fullWidth = false }) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      startIcon={<ArrowBackIcon />}
      size={size}
      fullWidth={fullWidth}
      sx={{
        minWidth: fullWidth ? "100%" : "auto",
        maxWidth: fullWidth ? 300 : "auto",
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderRadius: 2,
        px: 3,
        py: 1,
        color: 'text.secondary',
        borderColor: 'rgba(0,0,0,0.12)',
        backgroundColor: '#fff',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'primary.light',
          color: 'primary.contrastText',
          borderColor: 'primary.light',
        },
      }}
    >
      {label}
    </Button>
  );
}

export default BackButton;
