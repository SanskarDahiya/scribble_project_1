import React, { useState, useEffect } from "react";
import { getUserByUserId, sendMessage } from "../../sampleData/loginSetup";
const uuid = require("uuid").v4;
const deviceUuid = "messageOption";
const Wait = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <svg class="circular" width="48px" height="48px">
        <circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee" />
        <circle
          class="path"
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke-width="4"
          stroke-miterlimit="10"
          stroke="#F96D00"
        />
      </svg>
      Finding User
    </div>
  );
};
const SingleBlogSection = props => {
  // console.log(props);
  const { id: user_id = false } = (props && props.match && props.match.params) || {};
  console.log(user_id);
  const [userDetails, userDetailsUpdater] = useState(false);
  const [loader, loaderUpdater] = useState(true);
  if (!user_id) {
    // props.history.push("/");
  }
  const validateUser = async user_id => {
    let result = false;
    try {
      user_id = (user_id + "").trim();
      result = await getUserByUserId(user_id);
      result = result && result[0];
    } catch (err) {}
    userDetailsUpdater(result);
    loaderUpdater(false);
  };
  useEffect(() => {
    validateUser(user_id);
  }, []);
  return (
    <>
      <section className="ftco-section">
        {loader ? (
          <Wait />
        ) : (
          <>
            <div className="container">
              {userDetails ? <ShowUser {...props} toUser={userDetails} /> : <NoUser {...props} />}
            </div>
          </>
        )}
      </section>
    </>
  );
};
export default SingleBlogSection;

const NoUser = props => {
  return (
    <>
      <div className="row">
        <div className="col-lg-8 ">
          <h2 className="mb-3">{"NO USER FOUND"}</h2>
          Unable to find User, THere might be an problem with url Please try again
        </div>
      </div>
    </>
  );
};

const ShowUser = props => {
  const [name, nameUpdater] = useState("");
  const [message, messageUpdater] = useState("");
  const [alertzz, alertUpdater] = useState(false);
  const [loading, loadingUpdater] = useState(false);

  const setName = e => {
    e.preventDefault();
    alertzz && alertUpdater(false);
    nameUpdater(e.target.value);
  };

  const setMessage = e => {
    e.preventDefault();
    alertzz && alertUpdater(false);
    messageUpdater(e.target.value);
  };

  const formHandle = async e => {
    e.preventDefault();
    if (loading) {
      return;
    }
    loadingUpdater(true);
    let deviceId = localStorage.getItem(deviceUuid);
    if (!deviceId) {
      deviceId = uuid();
      localStorage.setItem(deviceUuid, deviceId);
    }
    alertUpdater(false);
    if (!message || !message.trim()) {
      alertUpdater(true);
      return;
    }
    if (!props.toUser) {
      alert("Encounter an error\nPlease Refresh");
      return;
    }
    let myUser = props.user || {};
    if (!myUser["device"]) {
      myUser["device"] = { _id: deviceId };
    }
    const newMessage = {
      to: props.toUser,
      message: {
        name,
        message
      },
      from: myUser
    };
    let result = await sendMessage(newMessage);
    result = result && result[0];
    props.history.push("/", { messageSent: result });
    nameUpdater("");
    messageUpdater("");
    loadingUpdater(false);
    return;
  };

  return (
    <>
      <div className="comment-form-wrap pt-5">
        <h3 className="mb-5 h4 font-weight-bold">
          Send a Message {props.toUser._id ? " to #" + props.toUser._id : ""}
        </h3>
        <form onSubmit={formHandle} className="p-5 bg-light">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" onChange={setName} value={name} />
          </div>
          <div className="form-group" style={{ border: alertzz ? "1px solid red" : "none" }}>
            <label htmlFor="message">Message *</label>
            <textarea id="message" className="form-control" value={message} onChange={setMessage} />
          </div>
          <div className="form-group">
            <br />
            <input type="submit" value={loading ? "SENDING" : "SEND"} className="py-3 px-4 btn-primary" />
          </div>
        </form>
      </div>
    </>
  );
};
