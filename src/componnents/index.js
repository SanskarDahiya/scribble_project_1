import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllMessages } from "../sampleData/loginSetup";
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
  const [messages, messagesUpdater] = useState([]);
  const getInitialMessage = async () => {
    if (props && props.user) {
      let result = await getAllMessages(props.user);
      console.log(result);
      messagesUpdater(result);
    } else {
      alert("Please re-login again");
    }
  };
  useEffect(() => {
    getInitialMessage();
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-lg-8 ">
          <h2 className="mb-3">{"Welcome " + props.user._id}</h2>
          Share this link: {window.location + "user#" + props.user._id}
          {messages && messages.length ? (
            messages.map((message) => <ShowMessagesCard message={message} {...props} />)
          ) : (
            <ShowNoMessageCard {...props} />
          )}
        </div>
      </div>
    </>
  );
};

const ShowNoMessageCard = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-8 ">
          <h2 className="mb-3">{"SCRIBBLE 2020"}</h2>
          No Message
        </div>
      </div>
    </>
  );
};
const ShowMessagesCard = (props) => {
  const { message: { message: { message = "" } = {} } = {} } = props || {};
  console.log(message);

  return (
    <>
      <div className="row">
        <div className="col-sm-8 ">Message:> {"  " + message}</div>
      </div>
    </>
  );
};

const ShowIndex = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <h2 className="mb-3">{"SCRIBBLE 2020"}</h2>
          <div>
            <code>
              Anything is possible when you have the right people there to support you <sub>~Misty Copeland</sub>
            </code>
            <br />
            <br />
            <Link to="/login">Click here to login/signup!</Link>
          </div>
          <div>
            <code>HUMARE VICHAR</code>
          </div>
          <div>
            <p>
              There many events that occur before a college student graduates.
              <br />
              The final year is a very Financial year Placement, exams and many more worries are them and we are standing at the door of starting a
              whole new life be it for job, Higher studies ,Startup, business many more. <br />
              <p>But friends, they are the lifeline.</p>
              <p>
                <Link to="/login">Click here to login/signup!</Link>
              </p>
              There has to be a way to make the{" "}
              <u>
                <i>last leaving memories</i>
              </u>{" "}
              with these friends, who he became a family member in these years .Due to this pandemic no farewell , no annual fest, no scribble day was
              there. As everything getting online.
              <div>
                <p>The scribble day can also be celebrated online. Let your friends write anything about you for you</p>
              </div>
            </p>
          </div>
          <Link to="/login">Click here to login/signup!</Link>
          <br />
        </div>
      </div>
    </>
  );
};

const ShowMessageBox = (props) => {
  const { isMessageSent: { to: { _id: user = false } = {} } = {} } = props || {};
  console.log(props);

  return (
    <>
      <div className="row">
        <div className="col-lg-8 ">
          <h2 className="mb-3">{"Message Send To #" + user}</h2>
          Thanks to send your message.!
        </div>
      </div>
    </>
  );
};
