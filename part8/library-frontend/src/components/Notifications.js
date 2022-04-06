import React from "react";

const Notifications = ({ notificationMessage }) => {
  return (
    <div>
      {notificationMessage.type === "error" && (
        <div
          style={{ border: "solid 2px", borderColor: "red", height: "30px" }}
        >
          <b> {notificationMessage.message}</b>
        </div>
      )}
      {notificationMessage.type === "info" && (
        <div
          style={{ border: "solid 2px", borderColor: "green", height: "30px" }}
        >
          {notificationMessage.message}
        </div>
      )}
    </div>
  );
};

export default Notifications;
