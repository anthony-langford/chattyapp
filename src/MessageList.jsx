import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");

    return (

        {this.props.messages.map((message) =>
          <div className="message">
            <span className="username">Anonymous1</span>
            <span className="content">I won't be impressed with technology until I can download food.</span>
          </div>
        )}


      // <div className="message">
      //   <span className="username">Anonymous1</span>
      //   <span className="content">I won't be impressed with technology until I can download food.</span>
      // </div>
    )
  }
}

export default MessageList;