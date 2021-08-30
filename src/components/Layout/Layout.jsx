import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import ChatList from '../ChatList/ChatList';
import MessageField from '../MessageField/MessageField';
import './Layout.css';

class Layout extends Component {
  state = {
    activeChat:
      this.props.match && this.props.match.params.id
        ? this.props.match.params.id
        : {},
  };

  componentDidUpdate() {
    if (
      !Object.keys(this.state.activeChat).length &&
      window.location.pathname.match(/\d/)
    ) {
      this.setState({
        activeChat: window.location.pathname.match(/\d/)[0],
      });
    }
  }

  setActiveChat = (i) => {
    this.setState({
      activeChat: i,
    });
  };

  setActiveChatName = () => {
    const { activeChat } = this.state;
    const { chats } = this.props;

    if (Object.keys(chats).length >= activeChat) {
      return Object.values(chats)[activeChat - 1].name;
    } else if (Object.keys(chats).length < activeChat) {
      return 'Нет такого чата';
    } else return 'Welcome';
  };

  render() {
    return (
      <div className="Layout">
        <Header
          chatName={this.setActiveChatName()}
          profile={this.props.isProfile}
        />
        <div className="main">
          <ChatList
            chatHandler={this.setActiveChat}
            activeChat={this.state.activeChat}
            user={this.props.user}
          />
          {this.props.chats[this.state.activeChat] ? (
            <MessageField
              activeChat={this.state.activeChat}
              user={this.props.user}
            />
          ) : (
            <h2 style={{ color: '#065032' }}>Выберите чат из списка</h2>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ chatReducer }) => ({
  chats: chatReducer.chatList,
  user: chatReducer.userId,
});

export default connect(mapStateToProps)(Layout);
