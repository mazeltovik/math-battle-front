import { useContext } from 'react';
import AlertContext from '../contexts/alertContext';

const useAlert = () => useContext(AlertContext);

export default useAlert;
