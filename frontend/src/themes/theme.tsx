import { createTheme } from '@mui/material/styles';

let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    primary: {
      main: '#3c37a4',
    },
    secondary: {
      main: '#dddbff',
    },
    accent: theme.palette.augmentColor({
      color: {
        main: '#443dff',
      },
      name: 'violet',
    }),
  },
});

export default theme;
