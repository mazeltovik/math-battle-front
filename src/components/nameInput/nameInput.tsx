//Styles
import './nameInput.scss';

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

//Handlers
import { focusInput, blurInput } from '../../handlers/focusBlurInput';

export default function NameInput({
  register,
  errors,
  showErr,
  setErr,
}: InputTypes) {
  return (
    <>
      <input
        type="text"
        id="name"
        onFocus={focusInput(setErr)}
        onBlurCapture={blurInput(setErr)}
        className={errors.name ? 'form__input errorInput' : 'form__input'}
        placeholder=" "
        autoComplete="off"
        defaultValue=""
        {...register('name', {
          required: { value: true, message: 'This field is required' },
          // minLength: {
          //   value: 2,
          //   message: 'Name must contain more than 2 characters',
          // },
          // pattern: {
          //   value: /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/i,
          //   message: 'Alphabetical characters only',
          // },
        })}
      ></input>
      <label htmlFor="name" className="form__label">
        Name
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
            {errors.name?.types &&
              Object.entries(errors.name?.types).map(([type, message]) => (
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
