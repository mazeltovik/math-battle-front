//Styles
import './emailInput.scss';

//Types
import { InputTypes } from '../../pages/authPage/authPageTypes';

//Images

//MUI
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
//Components

//React

//Hooks

//Helpers
import authPattern from '../../helpers/authPattern';
//Handlers
import { focusInput, blurInput } from '../../handlers/focusBlurInput';

export default function EmailInput({
  register,
  errors,
  showErr,
  setErr,
  id,
}: InputTypes) {
  return (
    <>
      <input
        type="text"
        id={id}
        onFocus={focusInput(setErr)}
        onBlurCapture={blurInput(setErr)}
        className={errors.login ? 'form__input errorInput' : 'form__input'}
        placeholder=" "
        autoComplete="off"
        defaultValue=""
        {...register('login', {
          validate: {
            required: (v) => {
              return authPattern.required(v);
            },
            // maxLength: (v) => {
            //   if (v) {
            //     return authPattern.maxLength(v, 'Email');
            //   }
            // },
            // matchDomainPattern: (v) => {
            //   return authPattern.matchDomainPattern(v);
            // },
            // matchEmailPattern: (v) => {
            //   return authPattern.matchEmailPattern(v);
            // },
            // matchSpacePattern: (v) => {
            //   return authPattern.matchSpacePattern(v, 'Email');
            // },
            // matchDogPattern: (v) => {
            //   return authPattern.matchDogPattern(v);
            // },
          },
        })}
      ></input>
      <label htmlFor={id} className="form__label">
        Email
      </label>
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
            {errors.login?.types &&
              Object.entries(errors.login?.types).map(([type, message]) => (
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
