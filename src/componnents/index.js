import React from "react";
import { Link } from "react-router-dom";

const Index = (props) => {
  const isMessageSent = (props && props.location && props.location.state && props.location.state.messageSent) || false;
  const isUserLoggin = props.user;

  if (isUserLoggin) {
    return (
      <>
        <section className="ftco-section">
          <div className="container">
            {isMessageSent ? <ShowMessageBox isMessageSent={isMessageSent} {...props} /> : <></>}
            <ShowMessages {...props} />
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section className="ftco-section">
          <div className="container">
            {isMessageSent ? <ShowMessageBox isMessageSent={isMessageSent} {...props} /> : <></>}
            <ShowIndex />
          </div>
        </section>
      </>
    );
  }
};

export default Index;

const ShowMessages = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-8 ">
          <h2 className="mb-3">{"TITLE"}</h2>
          your special messages
        </div>
      </div>
    </>
  );
};

const ShowIndex = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-8 ">
          <h2 className="mb-3">{"TITLE"}</h2>
          Login to get special messages
          <Link to="/login">login</Link>
        </div>
      </div>
    </>
  );
};

const ShowMessageBox = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-8 ">
          <h2 className="mb-3">{"TITLE"}</h2>
          showMessage
        </div>
      </div>
    </>
  );
};
