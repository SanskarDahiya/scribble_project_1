import React, { useState, useEffect } from "react";

const SingleBlogSection = (props) => {
  const user_id = (props && props.location && props.location.hash) || false;
  const userDetails = user_id;
  if (!user_id) {
    props.history.push("/");
  }
  return (
    <>
      <section className="ftco-section">
        <div className="container">{userDetails ? <ShowUser {...props} user={userDetails} updater={() => {}} /> : <NoUser {...props} />}</div>
      </section>
    </>
  );
};
export default SingleBlogSection;

const NoUser = (props) => {
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 ">
              <h2 className="mb-3">{"TITLE"}</h2>
              noUser
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ShowUser = (props) => {
  const [name, nameUpdater] = useState("");
  const [message, messageUpdater] = useState("");
  const [alertzz, alertUpdater] = useState(false);
  const setName = (e) => {
    e.preventDefault();
    alertzz && alertUpdater(false);
    nameUpdater(e.target.value);
  };
  const setMessage = (e) => {
    e.preventDefault();
    alertzz && alertUpdater(false);
    messageUpdater(e.target.value);
  };
  const formHandle = async (e) => {
    e.preventDefault();
    alertUpdater(false);
    if (!message || !message.trim()) {
      alertUpdater(true);
      return;
    }
    if (!props.user || !props.updater) {
      alert("Encounter an error\nPlease Refresh");
      return;
    }
    const newMessage = {
      user: props.user,
      message: {
        name,
        message,
      },
    };
    props.updater(newMessage);
    props.history.push("/", { messageSent: props.user });
    nameUpdater("");
    messageUpdater("");
    return;
  };
  return (
    <>
      <div className="comment-form-wrap pt-5">
        <h3 className="mb-5 h4 font-weight-bold">Send a Message</h3>
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
            <input type="submit" value="SEND" className="py-3 px-4 btn-primary" />
          </div>
        </form>
      </div>
    </>
  );
};
