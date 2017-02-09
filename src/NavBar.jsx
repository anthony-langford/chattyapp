import React, {Component} from 'react';

class NavBar extends Component {

  render() {
    console.log("Rendering <NavBar/>");
    return (
      <nav>
          <h1>Chatty
            <div>{this.props.userCount} user(s) in room</div>
          </h1>
      </nav>
    )
  }

}

export default NavBar;