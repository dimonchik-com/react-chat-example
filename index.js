import React, { Component } from 'react';
import { render } from 'react-dom';
import {Controls, MessageList} from './components/index.js';
import './style.scss';


class App extends Component {
  constructor() {
    this.state={
        messageList:[],
        randomColor:["#5164D7","#FD7E21","#6FC3E0","#6C65A9","#C44F69","#FF6565"]
      };
    super();
  }

  componentDidMount() {
    window.Chat.onMessage((messageReceived)=>{
       let messageList=[...this.state.messageList];
        messageReceived.color=this.state.randomColor[Math.floor(Math.random() * this.state.randomColor.length)];
        messageList.push(messageReceived);
        this.setState({ ...this.state, messageList:messageList });
    });
  }

  render() {
    return (
      <>
          <div className={`panel-body`}>
            <MessageList messageList={this.state.messageList} />
          </div>
          <div className={`panel-control`}>
            <Controls/>
          </div>
      </>
    );
  }
}

render(<App />, document.getElementById('root'));
