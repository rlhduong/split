import { createTheme } from '@mui/material/styles';

let theme = createTheme({});
theme = createTheme(theme, {
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 400,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    primary: {
      main: '#0b5198',
    },
    secondary: {
      main: '#80b5eb',
    },
    accent: theme.palette.augmentColor({
      color: {
        main: '#2e96ff',
      },
      name: 'accent',
    }),
  },
});

export default theme;
