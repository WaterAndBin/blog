export type MessageType = 'error' | 'info' | 'success' | 'warn';

interface MessageInfo {
  message: string;
  type: MessageType;
}

export type MessageData = string | MessageInfo;
