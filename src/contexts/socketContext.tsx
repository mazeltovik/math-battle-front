import { createContext, useState, ReactNode, useEffect } from 'react';
import useAlert from '../hooks/useAlert';
import { socket } from '../socket/socket';

type Children = {
  children: ReactNode;
};

type SocketContextType = {
  isConnected: boolean;
  socketId: string | undefined;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
};

const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  socketId: undefined,
  setIsConnected: () => {},
});

export const SocketProvider = ({ children }: Children) => {
  const { showWarningAlert } = useAlert();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [socketId, setSocketId] = useState<string | undefined>('');
  useEffect(() => {
    function onConnect() {
      console.log('connect', socket.id);
      setSocketId(socket.id);
      setIsConnected(true);
      // showWarningAlert(
      //   'You have connected without authorisation. Please verify yourself.'
      // );
    }

    function onDisconnect() {
      console.log('disconnect');
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  return (
    <SocketContext.Provider
      value={{
        isConnected,
        socketId,
        setIsConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
