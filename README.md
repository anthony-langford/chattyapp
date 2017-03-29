ChattyApp
=====================

A chat app built on React and websockets.


Clone the app

```
git clone git@github.com:iamtonybologna/chattyapp.git
```

Install the dependencies and start the websocket server (in the chatty_server folder), then the main server (in the chattyapp folder).

```
npm install
cd chatty_server
node server.js
cd ..
npm start
open http://localhost:3000
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
