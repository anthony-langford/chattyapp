import React, {Component} from 'react';
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
      let type = data.type;
      if (type === "message") {
        console.log(`Received from server: ${event.data}`);
        let messages = this.state.messages.concat(data);
        this.setState({messages: messages});
      }
    });


    // Update username
    ws.addEventListener('message', (event) => {
      let data = JSON.parse(event.data);
      let type = data.type;
      if (type === "updateUsername" && data.oldUsername === this.state.currentUser.name) {
        console.log(`Received from server: ${event.data}`);
        let newUser = data.newUsername;
        let messages = this.state.messages.concat(data);
        this.setState({currentUser: {name: newUser}, messages: messages});
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
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages})
    }, 3000);
  }

  constructor(props) {
    super(props);

    // On username field enter
    this._handleUsernameChange = (e) => {
      if (e.key === 'Enter') {
        let username = {
          type: "updateUsername",
          id: uuid.v1(),
          oldUsername: this.state.currentUser.name,
          newUsername: e.target.value,
          content: this.state.currentUser.name + " changed their name to: " + e.target.value
        };
        ws.send(JSON.stringify(username));
      }
    }

    // On chatbar field enter
    this._handleNewMessage = (e) => {
        if (e.key === 'Enter') {
          let message = {
            type: "message",
            id: uuid.v1(),
            username: this.state.currentUser.name,
            content: e.target.value
          };
          ws.send(JSON.stringify(message));
          document.getElementById("new-message").value = "";
        }
    }

    this.state = {
      currentUser: {name: "Anonymous"},
      messages: []
    }
  };

  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar currentUser={this.state.currentUser} _handleNewMessage={this._handleNewMessage} _handleUsernameChange={this._handleUsernameChange}/>
      </div>
    );
  }
}

export default App;
