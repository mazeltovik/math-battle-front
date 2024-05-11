import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    brown: Palette['primary'];
  }

  interface PaletteOptions {
    brown?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    brown: true;
  }
}

const theme = createTheme({
  palette: {
    brown: {
      main: '#ab7a5f',
      dark: '#8e502d',
    },
  },
});

export default theme;
