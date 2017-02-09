import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <input id="username" type="text" placeholder="Your Name (Optional)" onKeyUp={this.props._handleUsernameChange}/>
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyPress={this.props._handleNewMessage}/>
      </footer>
    )
  }

}

export default ChatBar;