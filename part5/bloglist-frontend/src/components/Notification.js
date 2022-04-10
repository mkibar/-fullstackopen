import React from "react";

const Notification = (props) => {
  let color = `${props.message?.type === "info" ? "green" : "red"}`;
  let border = props.message?.message ? `1px solid ${color}` : "";
  let style = { color: color, border: border, padding: "10px" };
  return (
    <div style={style} id="notification-message">
      {props.message?.message}
    </div>
  );
};

export default Notification;
