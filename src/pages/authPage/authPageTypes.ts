import { FieldErrors, UseFormRegister } from 'react-hook-form';
export type SignUpPageTypes = {
  inputs: {
    name?: string;
    login: string;
    password: string;
  };
};

export type SignUpInputs = SignUpPageTypes['inputs'];
export type SignInInputs = Omit<SignUpInputs, 'name'>;
export type InputTypes = {
  showErr: boolean;
  setErr: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<SignUpInputs>;
  errors: FieldErrors<SignUpInputs>;
  id: string;
};
export type authPageTypes = {};
