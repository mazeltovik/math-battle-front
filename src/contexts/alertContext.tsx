import { createContext, useState, ReactNode } from 'react';
import { AlertColor } from '@mui/material';

type AlertContextType = {
  open: boolean;
  text: string;
  type: AlertColor;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlert: (text: string, type: AlertColor) => void;
  showErrorAlert: (text: string) => void;
  showSuccessAlert: (text: string) => void;
  showWarningAlert: (text: string) => void;
};

type Children = {
  children: ReactNode;
};

const AlertContext = createContext<AlertContextType>({
  open: false,
  text: '',
  type: 'info',
  setOpen: () => {},
  setAlert: () => {},
  showErrorAlert: () => {},
  showSuccessAlert: () => {},
  showWarningAlert: () => {},
});

export const AlertProvider = ({ children }: Children) => {
  const [text, setText] = useState('');
  const [type, setType] = useState<AlertColor>('info');
  const [open, setOpen] = useState(false);

  const setAlert = (text: string, type: AlertColor) => {
    setText(text);
    setType(type);
    setOpen(true);
  };

  const showErrorAlert = (text: string) => setAlert(text, 'error');
  const showSuccessAlert = (text: string) => setAlert(text, 'success');
  const showWarningAlert = (text: string) => setAlert(text, 'warning');

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        setAlert,
        showErrorAlert,
        showSuccessAlert,
        showWarningAlert,
        open,
        setOpen,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
