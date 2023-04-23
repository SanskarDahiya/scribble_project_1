"use client";
import React from "react";
import Link from "next/link";
import { useAppStore } from "../stores/AppStore";

const Index = () => {
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <ShowIndex />
          <br />
          <br />
        </div>
      </section>
    </>
  );
};
export default Index;

const ShowIndex = () => {
  const user = useAppStore((state) => state.user);
  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <h2 className="mb-3">{"SCRIBBLE 2023"}</h2>
          <div style={{ position: "relative" }}>
            <div
              style={{
                opacity: 0.3,
                position: "absolute",
                top: "30%",
                right: "20%",
                transform: "rotate(38deg)",
              }}
            >
              <img src="data:image/jpeg;base64,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" />
            </div>
            <div
              style={{
                opacity: 0.3,
                position: "absolute",
                top: "70%",
                left: "10%",
                transform: "rotate(-38deg)",
              }}
            >
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCvd2lu-exJVwt5zBX0hKUfC0nnM8fMXWSslK4gpLyg&s" />
            </div>
            <div>
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
              {user ? (
                <>
                  <code
                    style={{
                      fontSize: "24px",
                    }}
                  >
                    Welcome!! {user.username}
                  </code>
                </>
              ) : (
                <Link href="/login">Click here to login/signup!</Link>
              )}
            </div>
            <div>
              <br />
              <code>HUMARE VICHAR</code>
            </div>
            <div>
              <p>
                Many events that occur before college students graduate. The
                last year is a very important year. Placements, exams and many
                other concerns are standing at the doorstep of starting a new
                life for jobs, higher studies, startups, businesses. <br />
                But friends, they are lifeline.
                <br /> There must be a way to make the{" "}
                <u>
                  <i>
                    last leaving memories <code>special,</code>
                  </i>
                </u>{" "}
                with those friends, who have became members of our family over
                the years. Due to this pandemic there was neither a farewell,
                nor an annual celebration and scribble day. Everything going
                digital.
              </p>
              <div>
                <p>
                  So, This scribble day can also be celebrated online. Express
                  your love to your friends through few words.{" "}
                </p>
              </div>
            </div>
            {!user && <Link href="/login">Click here to login/signup!</Link>}
          </div>
        </div>
      </div>
    </>
  );
};
