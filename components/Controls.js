import React, { useRef, useEffect, useReducer } from "react";

const initialState = { listUsers: {} };

function reducer(state, action) {
  switch (action.type) {
    case "pushUser": {
      const copyListUsers = {...state.listUsers};
      copyListUsers[action.userName] = {
        userName: action.userName,
        timeAdd: new Date().getTime(),
      };
      return {...state, listUsers: copyListUsers};
    }
    case "removeUser": {
      const copyListUsers = {...state.listUsers};
      delete copyListUsers[action.user.userName];
      return {...state, listUsers: copyListUsers};
    }
    default:
      throw new Error();
  }
}

export const Controls = () => {
  const refInput = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const actualState = useRef({ state: {}, dispatch: null });
  actualState.current.state = state;

  const checkUserPresence = (user) => {
    const listUsers = actualState.current.state.listUsers;
    if (Object.keys(listUsers).length) {
      for (let user in listUsers) {
        if (listUsers[user].timeAdd + 8e3 < new Date().getTime()) {
          dispatch({ type: "removeUser", user: listUsers[user] });
        }
      }
    }
  };

  const handleSubmit = (event) => {
    if (refInput.current.value) {
      window.Chat.sendMessage(refInput.current.value);
      refInput.current.value = "";
    }
    event.preventDefault();
  };

  useEffect(() => {
    window.Chat.onTyping((userName) => {
      if (userName != "Me") {
        dispatch({ type: "pushUser", userName: userName });
        setTimeout(() => {
          checkUserPresence();
        }, 8e3);
      }
    });
  }, []);

  return (
      <>
        <form className="controls" onSubmit={handleSubmit}>
          <div className="controls-wrap">
            {Object.keys(state.listUsers).length ? (
                <div className="controls-typing">
                  {Object.keys(state.listUsers).join(", ")} is writting...
                </div>
            ) : null}
            <div className="controls-flex">
              <input ref={refInput} placeholder="Say something" />
              <button>Send</button>
            </div>
          </div>
        </form>
      </>
  );
};
