import React, { useEffect, useState, useRef } from "react";
import { render } from "react-dom";
import { Controls, MessageList } from "./components";
import "./style.scss";

const App = () => {
  const [state, setState] = useState({
    messageList: [],
    randomColor: [
      "#5164D7",
      "#FD7E21",
      "#6FC3E0",
      "#6C65A9",
      "#C44F69",
      "#FF6565",
    ],
  });
  const actualState = useRef({state,setState});
  actualState.current={state,setState};

  useEffect(() => {
    window.Chat.onMessage((messageReceived) => {
      const [state, setState]=[actualState.current.state, actualState.current.setState];
      const messageList = [...state.messageList];
      messageReceived.color =
        state.randomColor[Math.floor(Math.random() * state.randomColor.length)];
      messageList.push(messageReceived);
      setState({ ...state, messageList });
    });
    return ()=>{
      // remove subscription on window.Chat.onMessage
    }
  }, []);

  return (
    <>
      <div className="panel-body">
        <MessageList messageList={state.messageList} />
      </div>
      <div className="panel-control">
        <Controls />
      </div>
    </>
  );
};

render(<App />, document.getElementById("root"));
