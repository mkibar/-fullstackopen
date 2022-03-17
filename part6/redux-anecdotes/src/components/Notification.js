import { connect } from "react-redux";

const Notification = (props) => {
  //const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  //return <div style={style}>{props.notification.message} </div>;
  return (
    <>
      {[...props.notification].map((e, i) => (
        <div key={i} style={style}>
          {e.message}{" "}
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotifications = connect(mapStateToProps)(Notification);
export default ConnectedNotifications;
//export default Notification;
