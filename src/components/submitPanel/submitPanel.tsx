//Styles
import './submitPanel.scss';

//Types
import { submitPanelTypes } from './submitPanelTypes';

//Images

//MUI
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
//Components

//React

//Hooks

//Helpers
import theme from '../../helpers/authTheme';
//Handlers

export default function SubmitPanel({ isLoading, btnPath }: submitPanelTypes) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Stack
          spacing={2}
          direction={'row'}
          alignItems={{ xs: 'center' }}
          justifyContent="center"
          sx={{ width: '100%' }}
        >
          {isLoading && (
            <CircularProgress
              size={37.5}
              sx={{ color: 'brown.main' }}
            ></CircularProgress>
          )}
          {!isLoading && (
            <Button
              variant="contained"
              type="submit"
              sx={{
                ':hover': {
                  bgcolor: 'brown.dark',
                },
                bgcolor: 'brown.main',
                width: '100%',
              }}
            >
              {btnPath}
            </Button>
          )}
        </Stack>
      </ThemeProvider>
    </>
  );
}
