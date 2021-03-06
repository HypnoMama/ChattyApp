import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Nav from './Nav.jsx';


class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: { name: 'Anonymous', userColor: 'black' },
      messages: [],
      count: 1
    }
    this.getMessage = this.getMessage.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }


  getMessage(event) {
    if (event.keyCode === 13){
  
    const newMessage = {
    username: this.state.currentUser.name,
    content: event.target.value,
    type: "postMessage",
    userColorName: this.state.currentUser.userColor
  }

  const stringMessage = JSON.stringify(newMessage)

  this.socket.send(stringMessage)

  event.target.value = ''
  }
} 
 
updateUser(event) {
    
      
  const newUser = event.target.value
  const oldName = this.state.currentUser.name
  this.setState({currentUser: {name: newUser, userColor: this.state.currentUser.userColor}})
  const updatedMessage = {
    oldUserName: oldName,
    username: newUser,
    type: "postNotification"
  }
  const stringUpdatedMessage = JSON.stringify(updatedMessage)
  this.socket.send(stringUpdatedMessage)
}



  componentDidMount() {
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 8, username: "Michelle", content: "Hello there!", userColorName:'#CC004F'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);

    this.socket = new WebSocket('ws://localhost:3001');

    function connected() {
      console.log("connected")     
    }


    this.socket.addEventListener('open', connected)
    
    this.socket.onmessage = (event) => {

      const parsedEvent = JSON.parse(event.data)
      if (parsedEvent.count) {
        this.setState({count: parsedEvent.count})
      } else if (parsedEvent.userColor) { 
        this.setState({currentUser: {name: this.state.currentUser.name, userColor: parsedEvent.userColor}})
      
      } else {       
      const newMessageAdd = this.state.messages.concat(parsedEvent)
      this.setState({ messages: newMessageAdd })
      }
      
    }
    
  }


  render() {

    const colorObject = {color: this.state.currentUser.userColor}
    

    return (

      <div>
        <Nav count={this.state.count} />
        <MessageList style={colorObject} updateUser={this.updateUser} messages={this.state.messages} />
        <ChatBar updateUser={this.updateUser} getMessage={this.getMessage} currentUser={this.state.currentUser} />
      </div>

    );
  }
}



export default App;
