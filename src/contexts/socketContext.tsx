import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from 'react';
import { socket } from '../socket/socket';

type Children = {
  children: ReactNode;
};

type SocketContextType = {
  isConnected: boolean;
  socketId: string | undefined;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  targetRoom: string;
  setTargetRoom: React.Dispatch<React.SetStateAction<string>>;
};

const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  socketId: undefined,
  setIsConnected: () => {},
  userId: '',
  setUserId: () => {},
  targetRoom: '',
  setTargetRoom: () => {},
});

export const SocketProvider = ({ children }: Children) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [socketId, setSocketId] = useState<string | undefined>('');
  const [userId, setUserId] = useState('');
  const [targetRoom, setTargetRoom] = useState('');
  useEffect(() => {
    function onConnect() {
      console.log('connect', socket.id);
      setSocketId(socket.id);
      setIsConnected(true);
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
        userId,
        setUserId,
        targetRoom,
        setTargetRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
