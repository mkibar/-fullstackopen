import React from "react";

const Message = ({ message }) => {
  const error = {
    color: "red",
    fontSize: 16,
    border: "thick double red",
    display: message?.message ? "block" : "none",
  };
  const info = {
    color: "green",
    fontSize: 16,
    border: "thick double green",
    display: message?.message ? "block" : "none",
  };
  return (
    <div style={message?.mt === "error" ? error : info}>{message?.message}</div>
  );
};

export default Message;
