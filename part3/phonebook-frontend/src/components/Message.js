import React from "react";

const Message = ({ message }) => {
  const error = {
    color: "red",
    fontSize: 16,
    border: "thick double red",
    display: message?.message ? "block" : "none",
    padding: "10px",
  };
  const info = {
    color: "green",
    fontSize: 16,
    border: "thick double green",
    display: message?.message ? "block" : "none",
    padding: "10px",
  };
  return (
    <div style={message?.mt === "error" ? error : info}>{message?.message}</div>
  );
};

export default Message;
