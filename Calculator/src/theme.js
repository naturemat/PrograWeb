import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5d8a82',
      light: '#8ba69e',
      dark: '#3d635c',
    },
    secondary: {
      main: '#7a96c7',
      light: '#a8c5e8',
      dark: '#4a6ea3',
    },
    background: {
      default: '#f8f6f3',
      paper: '#ffffff',
    },
    text: {
      primary: '#3d3d3d',
      secondary: '#6b6b6b',
    },
    divider: 'rgba(0, 0, 0, 0.06)',
    error: {
      main: '#e57373',
    },
    success: {
      main: '#81c784',
    },
    warning: {
      main: '#ffb74d',
    },
    info: {
      main: '#64b5f6',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          letterSpacing: '0.01em',
          padding: '10px 24px',
        },
        contained: {
          boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
          '&:hover': {
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          },
        },
        outlined: {
          borderWidth: 1.5,
          '&:hover': {
            borderWidth: 1.5,
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#fff',
            '&:hover': {
              backgroundColor: '#fafafa',
            },
            '&.Mui-focused': {
              backgroundColor: '#fff',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
