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
> & { userId: string };

export type Awaiter = {
  userId: string;
  name: string;
};

export type EmitApprovedConnection = {
  host: string;
  foe: string;
};

export type ReceiveApprovedConnection = {
  status: boolean;
  roomId: string;
};

export type ReceiveUpdateConnectedUsers = {
  roomId: string;
  connectedUsers: number;
};

export type EmitUpdateConnectedUsers = {
  host: string;
  updateUsers: number;
};

export type EmitSendMessage = {
  socketId: string;
  roomId: string;
  message: string;
};

export type ReciveSendMessage = Omit<EmitSendMessage, 'roomId'> & {
  messageId: string;
  sender: string;
};

export interface ServerToClientEvents {
  GET_ROOM_BY_USER_ID: (data: ReceiveCreatedRoom[] & Err) => void;
  CREATE_ROOM: (data: ReceiveCreatedRoom[] & Err) => void;
  GET_ROOMS: (data: ReceiveCreatedRoom[]) => void;
  ADD_CREATED_ROOM: (data: ReceiveCreatedRoom) => void;
  REQUEST_FOR_CONNECTING: ({
    amountOfAwaiters,
  }: {
    amountOfAwaiters: number;
  } & Err) => void;
  LEAVE_AWAITING_ROOM: (data: { amountOfAwaiters: number }) => void;
  GET_AWAITERS: (data: Awaiter[]) => void;
  APPROVE_CONNECTION: (data: ReceiveApprovedConnection) => void;
  REMOVE_AWAITER: (data: { amountOfAwaiters: number }) => void;
  UPDATE_CONNECTED_USERS: (data: ReceiveUpdateConnectedUsers) => void;
  SEND_MESSAGE: (data: ReciveSendMessage) => void;
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
  GET_AWAITERS: ({ userId }: { userId: string }) => void;
  APPROVE_CONNECTION: (data: EmitApprovedConnection) => void;
  REMOVE_AWAITER: (data: EmitApprovedConnection) => void;
  UPDATE_CONNECTED_USERS: (data: EmitUpdateConnectedUsers) => void;
  SEND_MESSAGE: (data: EmitSendMessage) => void;
}
