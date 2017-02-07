import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    return (
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
    )
  }
}

export default Message;
