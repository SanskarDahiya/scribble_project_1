import React, { useState, useEffect } from "react";
import Link from "next/link";
import SingleMessageCard from "../components/SingleMessageCard";
import { useAppStore } from "../stores/AppStore";
import { SITE_URL } from "../constants";
import { getPublicMessages } from "../helper/AxiosCall";
import Head from "next/head";

const Trends = () => {
  const user = useAppStore((state) => state.user);
  const messagesPublic = useAppStore((state) => state.messagesPublic);
  const setMessagesPublic = useAppStore((state) => state.setMessagesPublic);

  const [loading, loadingUpdater] = useState(false);

  async function fetchData() {
    try {
      const messages = await getPublicMessages();
      if (messages?.messages) {
        setMessagesPublic(messages?.messages);
        loadingUpdater(false);
      }
    } catch (err) {
      loadingUpdater(false);
    }
  }

  useEffect(() => {
    loadingUpdater(true);
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Nazdeekiyaan | Trends</title>
      </Head>
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2 className="mb-3">SCRIBBLE 2023</h2>
              <div style={{ position: "relative" }}>
                <div style={{ position: "relative" }}>
                  <code>
                    Anything is possible when you have the right people there to
                    support you{" "}
                  </code>
                  <sub
                    style={{
                      position: "absolute",
                      bottom: -20,
                      right: 0,
                    }}
                  >
                    ~Misty Copeland
                  </sub>
                </div>
                <br />
                <br />
                {!user && (
                  <Link href="/login">Click here to login/signup!</Link>
                )}
                <h2>Soon Adding This Exiting Feature</h2>
                <p>
                  Here, you can post your scribble as public or write anything
                  to us via username <br />
                  <Link href={"/user/nazdeekiyaan"}>
                    <code
                      style={{
                        color: "#666666",
                      }}
                      suppressHydrationWarning
                    >
                      {SITE_URL}/user/
                      <span style={{ color: "#e83e8c" }}>nazdeekiyaan</span>
                    </code>{" "}
                    or click here
                  </Link>
                  <br />
                </p>
              </div>
              <div>
                {messagesPublic && messagesPublic.length ? (
                  <>
                    <div>Thank you Guys for supporting us.</div>
                    {messagesPublic.map((message, index) => (
                      <SingleMessageCard key={index} message={message} />
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
