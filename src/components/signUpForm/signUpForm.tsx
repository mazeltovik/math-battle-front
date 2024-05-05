//Styles
import './signUpForm.scss';

//Types
import { SignUpInputs } from '../../pages/authPage/authPageTypes';

//Images

//MUI
import Stack from '@mui/material/Stack';
//Components
import NameInput from '../../components/nameInput/nameInput';
import EmailInput from '../../components/emailInput/emailInput';
import PasswordInput from '../../components/passwordInput/passwordInput';
import SubmitPanel from '../submitPanel/submitPanel';
//React
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
//Hooks

//Helpers

//Handlers

export default function SignUpForm() {
  const [showNameErr, setShowNameErr] = useState<boolean>(false);
  const [showLoginErr, setShowLoginErr] = useState<boolean>(false);
  const [showPassErr, setShowPassErr] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>({ criteriaMode: 'all', mode: 'onChange' });
  const onSubmit: SubmitHandler<SignUpInputs> = (body) => {
    console.log(body);
  };
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="form__avatar__wrapper">
          <img className="form__reg_logo" src={userIcon} alt="User Logo"></img>
        </div> */}
        {/* <p className="form__description">design your comfort zone with us</p> */}
        <Stack spacing={7}>
          <div className="form__group">
            <NameInput
              register={register}
              errors={errors}
              showErr={showNameErr}
              setErr={setShowNameErr}
              id={''}
            />
          </div>
          <div className="form__login">
            <EmailInput
              register={register}
              errors={errors}
              showErr={showLoginErr}
              setErr={setShowLoginErr}
              id={'signUp-id'}
            />
          </div>
          <div className="form__password">
            <PasswordInput
              register={register}
              errors={errors}
              showErr={showPassErr}
              setErr={setShowPassErr}
              id={'signUp-password'}
            />
          </div>
          <SubmitPanel isLoading={false} btnPath="SignUp" />
        </Stack>
      </form>
    </div>
  );
}
