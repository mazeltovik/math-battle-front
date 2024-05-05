//Styles
import './passwordInput.scss';

//Types
import { InputTypes } from '../../pages/authPage/authPageTypes';

//Images

//MUI
import { IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
//Components

//React
import { useState } from 'react';
//Hooks

//Helpers
import authPattern from '../../helpers/authPattern';
//Handlers
import { focusInput, blurInput } from '../../handlers/focusBlurInput';

export default function PasswordInput({
  register,
  errors,
  showErr,
  setErr,
  id,
}: InputTypes) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);
  return (
    <>
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        onFocus={focusInput(setErr)}
        onBlurCapture={blurInput(setErr)}
        className={errors.password ? 'form__input errorInput' : 'form__input'}
        placeholder=" "
        {...register('password', {
          validate: {
            required: (v) => {
              return authPattern.required(v);
            },
            maxLength: (v) => {
              return authPattern.maxLength(v, 'Password');
            },
            matchSpacePattern: (v) => {
              return authPattern.matchSpacePattern(v, 'Password');
            },
            matchLowerCasePattern: (v) => {
              return authPattern.matchLowerCasePattern(v);
            },
            matchUpperCasePattern: (v) => {
              return authPattern.matchUpperCasePattern(v);
            },
            matchDigitPattern: (v) => {
              return authPattern.matchDigitPattern(v);
            },
          },
        })}
      ></input>
      <label htmlFor={id} className="form__label">
        Password
      </label>
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        sx={{ position: 'absolute', right: '0', pt: '10px' }}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
      {showErr && (
        <Paper
          elevation={3}
          sx={{
            zIndex: 100,
            width: '100%',
            position: 'absolute',
            bgcolor: '#dedd11',
          }}
        >
          <Stack>
            {errors.password?.types &&
              Object.entries(errors.password?.types).map(([type, message]) => (
                <p key={type} className="error">
                  {message}
                </p>
              ))}
          </Stack>
        </Paper>
      )}
    </>
  );
}
