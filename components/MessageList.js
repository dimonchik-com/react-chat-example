import React from "react";
import Message from "./Message";
import "./../styles/controls.scss";

export default ({ messageList }) => {
  return (
      <>
        {messageList.map((message, index) => {
          return (
              <Message
                  prevMessage={messageList[index - 1]}
                  message={message}
                  key={message.id}
              />
          );
        })}
      </>
  );
};
