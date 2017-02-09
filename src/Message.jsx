import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    let content = this.props.content;
    let imgNumber = 0;

    const renderContentWithImages = (content) => {
      // hello there is a http://placehold.it/300x200.jpg ok great
      content = content.split(" ");
      content = content.map((word) => {
        return getImageTag(word);
      });
      return content;
    }

    const getImageTag = (str) =>  {
      const urlMatch = str.match(/(https?:)?\/\/[^\s]+(jpeg|jpg|png|gif|bmp)/ig);
      if (urlMatch == null) {
        return " " + str;
      } else {
        imgNumber += 1;
        return <div key={imgNumber}><img className="img" key={imgNumber} src={urlMatch[0]} /></div>
      }
    }

    if (content.match(/(https?:)?\/\/[^\s]+(jpeg|jpg|png|gif|bmp)/ig)) {
      return (
        <div className="message content">
          <span className="username" style={this.props.userColor}>{this.props.username}</span>
          <span className="content">
            {renderContentWithImages(content)}
          </span>
        </div>
      )
    } else {
      return (
        <div className="message content">
          <span className="username" style={this.props.userColor}>{this.props.username}</span>
          <span className="content">
            {content}
          </span>
        </div>
      )
    }
  }
}

export default Message;
