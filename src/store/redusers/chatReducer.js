import update from 'react-addons-update';
import { SEND_MESSAGE, DEL_MESSAGE } from '../actions/msgActions';
import {
  ADD_CHAT,
  GET_CHATS_SUCCESS,
  GET_CONTACTS_SUCCESS,
} from '../actions/chatActions';

const initialStore = {
  chatList: {},
  contactList: [],
  userId: 'u-1',
};

export default function chatReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_CHATS_SUCCESS: {
      return update(store, {
        chatList: {
          $set: action.chats,
        },
      });
    }
    case GET_CONTACTS_SUCCESS: {
      return update(store, {
        contactList: {
          $set: action.contacts,
        },
      });
    }
    case DEL_MESSAGE: {
      return update(store, {
        chatList: {
          [action.activeChat]: {
            messageList: {
              $splice: [
                [
                  store.chatList[action.activeChat].messageList.indexOf(
                    action.id
                  ),
                  1,
                ],
              ],
            },
          },
        },
      });
    }
    case SEND_MESSAGE: {
      return update(store, {
        chatList: {
          $merge: {
            [action.chatId]: {
              name: store.chatList[action.chatId].name,
              messageList: [
                ...store.chatList[action.chatId].messageList,
                action.messageId,
              ],
            },
          },
        },
      });
    }
    case ADD_CHAT: {
      const chatId = Object.keys(store.chatList).length + 1;
      return update(store, {
        chatList: {
          $merge: {
            [chatId]: {
              name: action.title,
              messageList: [],
            },
          },
        },
      });
    }
    default:
      return store;
  }
}
