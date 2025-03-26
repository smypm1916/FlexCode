import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Messages/Message/Message";
import "./Messages.css";

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) =>
      message ? (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ) : null
    )}
  </ScrollToBottom>
);

export default Messages;
