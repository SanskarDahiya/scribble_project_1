import React, { useState } from "react";
import { GetServerSideProps } from "next";

import { IUser, modifyUser } from "../../types";
import { getClientDb } from "mongo-client";
import { TABLES } from "../../constants";
import FormWrapper from "custom-form-hook";
import { sendMessage } from "../../helper/AxiosCall";
import { useAppStore } from "../../stores/AppStore";
// import { getUserByUserId, sendMessage } from "../../sampleData/loginSetup";

const Wait = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg className="circular" width="48px" height="48px">
        <circle
          className="path-bg"
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke-width="4"
          stroke="#eeeeee"
        />
        <circle
          className="path"
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

const SingleBlogSection = ({ user }: { user: IUser | null }) => {
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          {user ? <ShowUser toUser={user} /> : <NoUser />}
        </div>
      </section>
    </>
  );
};
export default SingleBlogSection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userid = context.query.userid as any;
  const db = await getClientDb();
  const user = (await db
    .collection(TABLES.user)
    .findOne({ _id: userid })) as unknown as IUser | null;

  return {
    props: {
      user: (user && JSON.parse(JSON.stringify(modifyUser(user)))) || null,
    },
  };
};

const NoUser = () => {
  return (
    <div className="row">
      <div className="col-lg-8 ">
        <br />
        <h2 className="mb-3">{"NO USER FOUND"}</h2>
        Unable to find User, There might be an problem with url <br />
        Please try again
      </div>
    </div>
  );
};

const ShowUser = (props: { toUser: IUser }) => {
  const [isSubmitted, setSubmitted] = useState(false);
  const formHandle = async (data: any) => {
    if (
      !data?.send_message ||
      !data?.send_message.trim() ||
      data?.send_message.trim().length <= 10
    ) {
      throw new Error("Invalid Username or Password or Email");
    }
    try {
      const result = await sendMessage({
        from: (data?.send_username || "").trim(),
        message: data.send_message.trim(),
        to: props.toUser._id,
      });
      setSubmitted(result?.success === true);
    } catch (err: any) {
      const message = err?.response?.data?.message || "something went wrong";
      throw new Error(message);
    }
  };

  return (
    <>
      <div className="comment-form-wrap pt-5">
        <h3 className="mb-2 h4 font-weight-bold">
          Send a Message{" "}
          {props.toUser.username ? " to #" + props.toUser.username : ""}
        </h3>
        {props.toUser._id === "nazdeekiyaan" && (
          <code>*All messages will be public</code>
        )}

        <div className="p-5 bg-light" onClick={() => setSubmitted(false)}>
          {isSubmitted && (
            <code>
              Thanks to send your message!.
              <br /> You know you can sent multiple message to same person. Try
              sending another message
            </code>
          )}
          <FormWrapper
            onFormSubmit={formHandle}
            inputs={[
              {
                name: "send_username",
                label: "From / Ur Name",
                inputField: {
                  type: "text",
                },
              },
              {
                name: "send_message",
                textArea: true,
                inputField: {
                  placeholder: "Enter Message *",
                },
                formFields: {
                  required: true,
                  min: 10,
                  minLength: 10,
                },
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};
