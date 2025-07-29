import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import className from 'classnames';
import {
  getDialogMessages,
  clearMessageList,
} from '../../../../store/slices/chatSlice';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import styles from './Dialog.module.sass';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';

const Dialog = props => {
  const messagesEnd = useRef();

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    props.clearMessageList();
    props.getDialog({ interlocutorId: props.interlocutor.id });
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (props.interlocutor.id !== props.interlocutor.id) {
      props.clearMessageList();
      props.getDialog({ interlocutorId: props.interlocutor.id });
    }
    if (messagesEnd.current) scrollToBottom();
  }, [props.interlocutor.id, props.clearMessageList, props.getDialog]);

  useEffect(() => {
    return () => {
      props.clearMessageList();
    };
  }, [props.clearMessageList]);

  const renderMainDialog = () => {
    const messagesArray = [];
    const { messages, userId } = props;
    let currentTime = moment();
    messages.forEach(message => {
      if (!currentTime.isSame(message.createdAt, 'date')) {
        messagesArray.push(
          <div key={`date-${message.createdAt}`} className={styles.date}>
            {moment(message.createdAt).format('MMMM DD, YYYY')}
          </div>
        );
        currentTime = moment(message.createdAt);
      }
      messagesArray.push(
        <div
          key={
            message.id ||
            message._id ||
            `msg-${message.createdAt}-${message.sender}`
          }
          className={className(
            userId === message.sender ? styles.ownMessage : styles.message
          )}
        >
          <span>{message.body}</span>
          <span className={styles.messageTime}>
            {moment(message.createdAt).format('HH:mm')}
          </span>
          <div ref={messagesEnd} />
        </div>
      );
    });
    return <div className={styles.messageList}>{messagesArray}</div>;
  };

  const blockMessage = () => {
    const { userId, chatData } = props;
    const { blackList, participants } = chatData;
    const userIndex = participants.indexOf(userId);
    let message;
    if (chatData && blackList[userIndex]) {
      message = 'You block him';
    } else if (chatData && blackList.includes(true)) {
      message = 'He block you';
    }
    return <span className={styles.messageBlock}>{message}</span>;
  };

  const { chatData, userId } = props;

  return (
    <div className={styles.dialogContainer}>
      <ChatHeader userId={userId} />
      {renderMainDialog()}
      <div ref={messagesEnd} />
      {chatData && chatData.blackList.includes(true) ? (
        blockMessage()
      ) : (
        <ChatInput />
      )}
    </div>
  );
};

const mapStateToProps = state => state.chatStore;

const mapDispatchToProps = dispatch => ({
  getDialog: data => dispatch(getDialogMessages(data)),
  clearMessageList: () => dispatch(clearMessageList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
