import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    brown: Palette['primary'];
    cyan: Palette['primary'];
  }

  interface PaletteOptions {
    brown?: PaletteOptions['primary'];
    cyan?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    brown: true;
    cyan: true;
  }
}

const theme = createTheme({
  palette: {
    brown: {
      main: '#ab7a5f',
      dark: '#8e502d',
      light: '#dcb59f',
    },
    cyan: {
      main: '#c5e4e7',
      light: '#86d1dc',
      dark: '#4094a0',
    },
  },
});

export default theme;
