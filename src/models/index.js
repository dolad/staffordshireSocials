// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Message, ChatRoom, Users, ChatRoomUsers } = initSchema(schema);

export {
  Message,
  ChatRoom,
  Users,
  ChatRoomUsers
};