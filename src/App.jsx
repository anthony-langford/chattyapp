import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
const ws = new WebSocket('ws://localhost:4000');
const uuid = require('node-uuid');

class App extends Component {

  componentDidMount() {
    console.log("componentDidMount <App />");

    ws.addEventListener('open', (event) => {
      console.log("Connected to WS Server.");
    });

    // New message
    ws.addEventListener('message', (event) => {
      let data = JSON.parse(event.data);
      let messages = this.state.messages.concat(data);
      let type = data.type;
      switch(type) {
        case "updateUserCount":
          console.log(`Received from server: ${event.data}`);
          this.setState({userCount: data.userCount, userColor: data.userColor});
          break;
        case "incomingMessage":
          console.log(`Received from server: ${event.data}`);
          this.setState({messages: messages});
          break;
        case "incomingNotification":
          console.log(`Received from server: ${event.data}`);
          let newUser = data.newUsername;
          this.setState({messages: messages});
          break;
        default:
          throw new Error("Unknown event type " + data.type);
        }
      });

    ws.addEventListener('error', (error) => {
      console.log(`Error: ${error}`)
    });

    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {
        id: uuid.v1(),
        username: "Michelle",
        content: "Hello there!",
      };
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages})
    }, 3000);

    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {
        id: uuid.v1(),
        username: "Bob",
        content: "fuck off, Michelle https://yt3.ggpht.com/-V92UP8yaNyQ/AAAAAAAAAAI/AAAAAAAAAAA/zOYDMx8Qk3c/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
      };
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages})
    }, 5000);

  }

  constructor(props) {
    super(props);

    // On username field enter
    this._handleUsernameChange = (e) => {
      if (e.key === 'Enter') {
        let username = {
          type: "postNotification",
          id: uuid.v1(),
          newUsername: e.target.value,
          content: this.state.currentUser.name + " changed their name to: " + e.target.value
        };
        this.state.currentUser.name = e.target.value;
        ws.send(JSON.stringify(username));
      }
    }

    // On chatbar field enter
    this._handleNewMessage = (e) => {
        if (e.key === 'Enter') {
          let message = {
            type: "postMessage",
            id: uuid.v1(),
            username: this.state.currentUser.name,
            content: e.target.value,
            style: {color: this.state.userColor}
          };
          ws.send(JSON.stringify(message));
          document.getElementById("new-message").value = "";
        }
    }

    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      userCount: 0,
      userColor: ""
    }
  };

  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
          <NavBar userCount={this.state.userCount} />
          <MessageList messages={this.state.messages} />
          <ChatBar currentUser={this.state.currentUser} _handleNewMessage={this._handleNewMessage} _handleUsernameChange={this._handleUsernameChange} />
      </div>
    );
  }

}

export default App;
