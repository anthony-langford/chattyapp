import React, {Component} from 'react';

class ChatBar extends Component {

  handleUserFieldKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.props.handleUserChange(e.target.value)
    }
  }

  handleMessageFieldKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.props.handleNewMessage(e.target.value)
      e.target.value = "";
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <input id="username" type="text" placeholder="Your Name (Optional)" onKeyUp={this.handleUserFieldKeyUp}/>
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyPress={this.handleMessageFieldKeyUp}/>
      </footer>
    )
  }



}

export default ChatBar;