import { createTheme } from '@mui/material/styles';

// Purple and orange palette with mixed shades
const theme = createTheme({
  palette: {
    primary: {
      main: '#7c3aed', // Deep purple
      light: '#a78bfa', // Light purple
      dark: '#4c1d95', // Dark purple
      contrastText: '#fff',
    },
    secondary: {
      main: '#fb923c', // Orange
      light: '#fdba74', // Light orange
      dark: '#c2410c', // Dark orange
      contrastText: '#fff',
    },
    background: {
      default: '#f3e8ff', // Very light purple
      paper: '#fff7ed', // Very light orange
    },
    text: {
      primary: '#2d0a4b', // Deep purple for text
      secondary: '#a16207', // Muted orange for secondary text
    },
  },
  typography: {
    fontFamily: [
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
