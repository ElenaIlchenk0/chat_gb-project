import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendMessage,
  deleteMsg,
  loadMsgs,
} from '../../store/actions/msgActions';
import MessageComponent from '../MessageComponent/MessageComponent';
import ChatInput from '../ChatInput/ChatInput';
import './MessageField.css';

const MessageField = (props) => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chatReducer.chatList);
  const msgs = useSelector((state) => state.msgReducer.msgs);

  const fieldRef = useRef(null);

  useEffect(() => {
    if (fieldRef.current) {
      fieldRef.current.scrollTop = fieldRef.current.scrollHeight;
    }
  });

  useEffect(() => {
    dispatch(loadMsgs('/api/msgs/' + props.user));
  }, [dispatch, props.user]);

  const sendHandler = useCallback(
    (text, sender) => {
      const { activeChat } = props;
      const messageId = Object.keys(msgs).length + 1;

      dispatch(sendMessage(messageId, text, sender, activeChat));
    },
    [dispatch, msgs, props]
  );

  const chatClickHandler = useCallback(
    (id, activeChat) => {
      dispatch(deleteMsg(id, activeChat));
    },
    [dispatch]
  );

  const renderMsgs = () => {
    const { activeChat } = props;
    return chats[activeChat].messageList.map((messageId, index) => {
      if (Object.keys(msgs).length) {
        return (
          <MessageComponent
            key={index}
            text={msgs[messageId].text}
            sender={msgs[messageId].sender}
            chatClickHandler={() => chatClickHandler(messageId, props.activeChat)}
          />
        )
      }
      return null;
    });
  };

  return (
    <div className="chatField">
      <div ref={fieldRef} className="MessageField">
        {renderMsgs()}
      </div>
      <ChatInput onClickHandler={sendHandler} />
    </div>
  );
};

export default MessageField;
