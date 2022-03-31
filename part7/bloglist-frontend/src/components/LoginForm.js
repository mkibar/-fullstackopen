import { useDispatch } from "react-redux";
import { userLogin } from "../reducers/loginReducer";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  // giriş işlemlerini kontrol et
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(
        userLogin({
          username: event.target.username.value,
          password: event.target.password.value,
        })
      );
      handleMessage({ message: "Wellcome to my blog", type: "INFORM" });
    } catch (exception) {
      handleMessage({ message: exception.message, type: "ERROR" });
    }
  };

  const handleMessage = ({ message, type }) => {
    dispatch(setNotification(message, type));
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" name="username" id="i-username" />
        </div>
        <div>
          password
          <input type="password" name="password" id="i-password" />
        </div>
        <button type="submit" id="b-login">
          login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
