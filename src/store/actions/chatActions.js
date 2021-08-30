export const ADD_CHAT = '@@chat/ADD_CHAT';
export const GET_CHATS_SUCCESS = '@@chat/GET_CHATS_SUCCESS';
export const GET_CONTACTS_SUCCESS = '@@chat/GET_CONTACTS_SUCCESS';
export const GET_USER = '@@chat/GET_USER';

export const addNewChat = (title) => ({
  type: ADD_CHAT,
  title,
});

export const getChatsSuccess = (chats) => ({
  type: GET_CHATS_SUCCESS,
  chats,
});

export const getContactsSuccess = (contacts) => ({
  type: GET_CONTACTS_SUCCESS,
  contacts,
});

export const loadChats = (url) => (dispatch) => {
  fetch(url)
    .then((res) => res.json())
    .then((chats) => dispatch(getChatsSuccess(chats)))
    .catch((err) => console.log(err));
};

export const loadContacts = (url) => (dispatch) => {
  fetch(url)
    .then((res) => res.json())
    .then((contacts) => dispatch(getContactsSuccess(contacts)))
    .catch((err) => console.log(err));
};

export const addChat = (title) => (dispatch, getState) => {
  fetch('/api/chats/u-1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      [Object.keys(getState().chatReducer.chatList).length + 1]: {
        name: title,
        messageList: [],
      },
    }),
  });

  //не работает then и catch

  // .then(() => {
  //   console.log('then');
  //   dispatch(addNewChat(title));
  // })
  // .catch(err => console.log(err));

  return dispatch(addNewChat(title));
};
