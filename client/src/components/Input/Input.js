import React from "react";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage }) => (
  <form
    className="form"
    onSubmit={(e) => {
      e.preventDefault();
      sendMessage(e);
    }}
  >
    <input
      className="input"
      type="text"
      placeholder="メッセージを入力してください…"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onkeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
    />
    <button className="sendButton" type="submit">
      送信
    </button>
  </form>
);

export default Input;
