//Styles
import './authPage.scss';

//Types
import { authPageTypes } from './authPageTypes';

//Images

//MUI
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
//Components
import SignInForm from '../../components/signInForm/signInForm';
import SignUpForm from '../../components/signUpForm/signUpForm';
import SubmitPanel from '../../components/submitPanel/submitPanel';
//React
import { useState } from 'react';
//Hooks

//Helpers

//Handlers

export default function AuthPage({}: authPageTypes) {
  const [active, setActive] = useState(true);
  return (
    <div className="auth-wrapper">
      <input type="radio" name="buttons" id="button1" defaultChecked />
      <input type="radio" name="buttons" id="button2" />
      <div className="forms-container">
        <ul className="forms-wrap">
          <li className="auth-form">
            <SignUpForm />
          </li>
          <li className="auth-form">
            <SignInForm />
          </li>
        </ul>
        <div className="flex-dots">
          <div className="dots" onClick={() => setActive(!active)}>
            <div className={active ? 'label-wrapper active' : 'label-wrapper'}>
              <label htmlFor="button1">
                <PersonAddIcon />
              </label>
            </div>
            <div className={!active ? 'label-wrapper active' : 'label-wrapper'}>
              <label htmlFor="button2">
                <LoginIcon />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
