import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SignUpInputs } from '../../pages/authPage/authPageTypes';
export type nameInputTypes = {
  register: UseFormRegister<SignUpInputs>;
  errors: FieldErrors<SignUpInputs>;
};
