import React from 'react';

export default ({message, prevMessage})=>{
  self=message.user=='Me'?'self':'';
  let withArrow=(!prevMessage || message.user!=prevMessage.user)?'with-arrow':'';

  const getDate = (timestamp) =>{
    function pad(num) { 
      return ("0"+num).slice(-2);
    }
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return pad(hours)+":"+pad(minutes);
  }

  return (
    <div className={`wrapperMessage`}>
      <div className={`message ${self} ${withArrow}`}>
        {self?null:(
          <div className={`name`} style={{color:message.color}}>{message.user}</div>
        )}
        <div className={`content`}>{message.content}</div>
        <div className={`time`}>
          {getDate(message.timestamp)}
        </div>
      </div>
    </div>
  )
}