import { NOTIFY_USER } from './types';

export const notifyUser = (messageType, message) => {
  return {
    type: NOTIFY_USER,
    message,
    messageType
  };
};
