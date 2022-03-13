import React from "react";

const Notification = (props) => {
  let style = { color: `${props.message?.type === "info" ? "green" : "red"}` };
  return <div style={style} id="notification-message">{props.message?.message}</div>;
};

export default Notification;
