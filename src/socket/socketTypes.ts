export type ReceiveCreatedRoom = {
  roomId: string;
  name: string;
  difficulty: number;
  isAllowedChat: boolean;
  time: string;
  connectedUsers: number;
};
export type Err = {
  err: string;
  warning: string;
};

export type EmitCreationOfRoom = Omit<
  ReceiveCreatedRoom,
  'roomId' | 'connectedUsers'
> & { userId: string; socketId: string | undefined };

export type Awaiter = {
  userId: string;
  name: string;
};

export interface ServerToClientEvents {
  GET_ROOM_BY_USER_ID: (data: ReceiveCreatedRoom[] & Err) => void;
  CREATE_ROOM: (data: ReceiveCreatedRoom[] & Err) => void;
  GET_ROOMS: (data: ReceiveCreatedRoom[]) => void;
  ADD_CREATED_ROOM: (data: ReceiveCreatedRoom) => void;
  REQUEST_FOR_CONNECTING: (amoutOfAwaiters: number) => void;
  LEAVE_AWAITING_ROOM: (amoutOfAwaiters: number) => void;
  GET_AWAITERS: (data: Awaiter[]) => void;
}

export interface ClientToServerEvents {
  GET_ROOM_BY_USER_ID: ({ userId }: { userId: string }) => void;
  CREATE_ROOM: (data: EmitCreationOfRoom) => void;
  GET_ROOMS: ({ userId }: { userId: string }) => void;
  REQUEST_FOR_CONNECTING: ({
    userId,
    roomId,
  }: {
    userId: string;
    roomId: string;
  }) => void;
  LEAVE_AWAITING_ROOM: ({
    userId,
    targetRoom,
  }: {
    userId: string;
    targetRoom: string;
  }) => void;
  GET_AWAITERS: ({ userId }: { userId: string | undefined }) => void;
}
