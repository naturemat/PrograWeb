import React from "react";
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
      }}
    >
      {label}
    </Button>
  );
}

export default BackButton;
