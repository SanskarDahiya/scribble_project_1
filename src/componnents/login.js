import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { validateLogin, createUser } from "../sampleData/loginSetup";
import ErrorScreen from "./sectionComponents/ErrorScreen";
const uuid = require("uuid").v4;
const deviceUuid = "messageOption";
// import DirectSignIn from "./sectionComponents/DirectSignIn";
const Login = props => {
  if (props && props.user) {
    props.history.push("/");
  }
  const [error, errorUpdater] = useState(false);
  const [isLogin, isLoginUpdater] = useState(true);
  const [width, widthUpdater] = useState(window.innerWidth);
  const updateWindowDimensions = () => {
    widthUpdater(window.innerWidth);
  };
  const errorUpdater_ = x => errorUpdater(x);
  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  const SwitchLogin = () => {
    isLoginUpdater(!isLogin);
  };
  const getWidth = width => {
    if (width < 500) {
      return "80%";
    }
    if (width > 800) {
      return 800;
    }
    return width - 200;
  };
  // console.log(width);
  return (
    <>
      <div
        style={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <div style={{ width: getWidth(width) }}>
          {error && (
            <ErrorScreen
              error={error}
              onClick={() => {
                errorUpdater(false);
              }}
            />
          )}

          {isLogin ? (
            <LoginWrapper errorUpdater={errorUpdater_} {...props} SwitchLogin={SwitchLogin} />
          ) : (
            <Signup errorUpdater={errorUpdater_} {...props} SwitchLogin={SwitchLogin} />
          )}
        </div>
      </div>
    </>
  );
};

const LoginWrapper = props => {
  const userUpdater = props.userUpdate;
  const [author, authorUpdater] = useState("");
  const [message, messageUpdater] = useState("");
  const [alertzz, alertUpdater] = useState(false);
  const [loading, loadingUpdater] = useState(false);

  const setAuthor = e => {
    e.preventDefault();
    alertUpdater(false);
    authorUpdater(e.target.value);
  };

  const setMessage = e => {
    e.preventDefault();
    alertUpdater(false);
    messageUpdater(e.target.value);
  };

  const handelSubmit = async e => {
    try {
      e.preventDefault();
      if (loading) {
        return;
      }
      alertUpdater(false);
      if (!author || author.trim().length <= 0 || !message || message.trim().length <= 0) {
        alertUpdater(true);
        return;
      }
      const newLogin = {
        password: message,
        username: author.trim()
      };
      loadingUpdater(true);
      let resp = await validateLogin(newLogin);
      if (resp && resp.length) {
        resp = resp[0];
        resp["username"] = resp.username || resp._id;
        userUpdater(resp);
      } else {
        props.errorUpdater &&
          props.errorUpdater({
            name: "Invalid Credentials"
          });
      }
      loadingUpdater(false);
      return;
    } catch (err) {
      console.error(err);
      loadingUpdater(false);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handelSubmit}>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              autoFocus={true}
              onChange={setAuthor}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" onChange={setMessage} />
          </div>

          {/* <div className="form-group">
              <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
              </label>
              </div>
            </div> */}

          <button type="submit" className="btn-primary btn-block">
            {loading ? "Getting Info" : "Submit"}
          </button>
          <p className="forgot-password text-right">
            {alertzz && "Please fill all * fields"}
            Forgot <Link to="/contact">password? Contact Admin</Link>
          </p>
          <p className="forgot-password text-right">
            Don't have an account
            <Link onClick={props.SwitchLogin}>sign up?</Link>
          </p>
        </form>
      </div>
      <div>{/* <DirectSignIn {...props} /> */}</div>
    </>
  );
};

export default Login;

const Signup = props => {
  const userUpdater = props.userUpdate;
  const [author, authorUpdater] = useState("");
  const [message, messageUpdater] = useState("");
  const [password, passwordUpdater] = useState("");
  const [loading, loadingUpdater] = useState(false);
  const [alertzz, alertUpdater] = useState(false);

  const setAuthor = e => {
    e.preventDefault();
    alertUpdater(false);
    const val = e.target.value;
    authorUpdater(val);
    // console.log(val.match("^[a-zA-Z0-9_@]*$"));
  };

  const setMessage = e => {
    e.preventDefault();
    alertUpdater(false);
    messageUpdater(e.target.value);
  };
  const setPassword = e => {
    e.preventDefault();
    alertUpdater(false);
    passwordUpdater(e.target.value);
  };

  const handelSubmit = async e => {
    try {
      e.preventDefault();
      if (loading) {
        return;
      }
      let deviceId = localStorage.getItem(deviceUuid);
      if (!deviceId) {
        deviceId = uuid();
        localStorage.setItem(deviceUuid, deviceId);
      }
      alertUpdater(false);
      if (
        !password ||
        password.trim().length <= 0 ||
        !author ||
        author.trim().length <= 0 ||
        !message ||
        message.trim().length <= 0
      ) {
        alertUpdater(true);
        return;
      }
      if (author.length < 8 || password.length < 8) {
        props.errorUpdater({ name: "username or password Length must be greater than 8" });
        return;
      }
      if (!author.match("^[a-zA-Z0-9_@]*$")) {
        props.errorUpdater({ name: "Username contains only a-z,A-Z,0-9,$,_ only" });
        return;
      }
      const newLogin = {
        password: password,
        email: message,
        username: author,
        _id: author,
        device: {
          _id: deviceId
        }
      };
      loadingUpdater(true);
      let result = await createUser(newLogin);
      console.log(result);
      // alert(JSON.stringify(newLogin));
      userUpdater(newLogin);
      loadingUpdater(false);
      return;
    } catch (err) {
      loadingUpdater(false);
      console.log(err);
      props.errorUpdater && props.errorUpdater({ name: err.message });
    }
  };

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>User name *will be used to login</label>
          <input type="text" className="form-control" placeholder="User name" value={author} onChange={setAuthor} />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" onChange={setMessage} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" onChange={setPassword} />
        </div>

        <button type="submit" className="btn-primary btn-block">
          {loading ? "Please Wait" : "Sign Up"}
        </button>
        <p className="forgot-password text-right">
          {alertzz && "Please fill all fields\n"}
          Already registered <Link onClick={props.SwitchLogin}>sign in?</Link>
        </p>
      </form>
    </div>
  );
};
