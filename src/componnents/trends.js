import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getScribbleMessages } from "../sampleData/loginSetup";
import SingleMessageCard from "./SingleMessageCard";
const loc = ("" + window.location)
  .split("/")
  .splice(0, 3)
  .join("/");

const Trends = props => {
  const [messages, messagesUpdater] = useState([]);
  const [loading, loadingUpdater] = useState(false);

  const getInitialMessage = async () => {
    try {
      loadingUpdater(true);
      let result = await getScribbleMessages();
      //   console.log(result);
      messagesUpdater(result);
    } catch (err) {}
    loadingUpdater(false);
  };
  useEffect(() => {
    getInitialMessage();
  }, []);

  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2 className="mb-3">{"SCRIBBLE 2020"}</h2>
              <div style={{ position: "relative" }}>
                <div style={{ position: "relative" }}>
                  <code>Anything is possible when you have the right people there to support you </code>
                  <sub
                    style={{
                      position: "absolute",
                      bottom: -20,
                      right: 0
                    }}
                  >
                    ~Misty Copeland
                  </sub>
                </div>
                <br />
                <br />
                <Link to="/login">Click here to login/signup!</Link>
                <h2>Soon Adding This Exiting Feature</h2>
                <p>
                  Here, you can post your scribble as public or write anything to us via username{" "}
                  <code>nazdeekiyaan</code> <a href={loc + "/nazdeekiyaan"}> or click here</a>
                  <br />
                </p>
              </div>
              <div>
                {messages && messages.length ? (
                  <>
                    <div>Thank you Guys for supporting us.</div>
                    {messages.map((message, index) => (
                      <div key={index}>
                        <SingleMessageCard index={index} message={message} {...props} />
                      </div>
                    ))}
                  </>
                ) : loading ? (
                  <code>Loading Messages</code>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Trends;
