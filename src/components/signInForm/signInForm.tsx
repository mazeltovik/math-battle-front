//Styles
import './signInForm.scss';

//Types
import { SignInInputs } from '../../pages/authPage/authPageTypes';

//Images

//MUI
import Stack from '@mui/material/Stack';
//Components
import EmailInput from '../../components/emailInput/emailInput';
import PasswordInput from '../../components/passwordInput/passwordInput';
import SubmitPanel from '../submitPanel/submitPanel';
//React
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
//Hooks

//Helpers
import axios from 'axios';
//Handlers

export default function SignInForm() {
  const [showLoginErr, setShowLoginErr] = useState<boolean>(false);
  const [showPassErr, setShowPassErr] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs>({ criteriaMode: 'all', mode: 'onChange' });
  const onSubmit: SubmitHandler<SignInInputs> = async (body) => {
    const response = await axios.post('http://localhost:3000/user/auth', body);
    console.log(response);
  };
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="form__avatar__wrapper">
          <img className="form__reg_logo" src={userIcon} alt="User Logo"></img>
        </div> */}
        {/* <p className="form__description">design your comfort zone with us</p> */}
        <Stack spacing={7}>
          <div className="form__login">
            <EmailInput
              register={register}
              errors={errors}
              showErr={showLoginErr}
              setErr={setShowLoginErr}
              id={'signIn-id'}
            />
          </div>
          <div className="form__password">
            <PasswordInput
              register={register}
              errors={errors}
              showErr={showPassErr}
              setErr={setShowPassErr}
              id={'signIn-password'}
            />
          </div>
          <SubmitPanel isLoading={false} btnPath="SignIn" />
        </Stack>
      </form>
    </div>
  );
}
