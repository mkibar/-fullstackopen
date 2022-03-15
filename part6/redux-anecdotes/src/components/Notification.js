import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    borderColor:
      notification.type === "info"
        ? "green"
        : notification.type === "warning"
        ? "orange"
        : "black",
  };
  return <div style={style}>{notification.message} </div>;
};

export default Notification;
