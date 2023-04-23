"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "../stores/AppStore";
import SingleMessageCard from "../components/SingleMessageCard";
import { SITE_URL } from "../constants";
import { getAllMessages } from "../helper/AxiosCall";
import { useRouter } from "next/router";
import Head from "next/head";

const MyMessages = () => {
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <ShowMessages />
        </div>
      </section>
    </>
  );
};

export default MyMessages;

const ShowMessages = () => {
  const router = useRouter();
  const isLoading = useAppStore((state) => state.isLoading);
  const user = useAppStore((state) => state.user);
  const messages = useAppStore((state) => state.messages);
  const setMessages = useAppStore((state) => state.setMessages);

  const userLink = `${SITE_URL}/user/${user?._id}`;
  const [isFetching, setIsFetching] = useState(true);
  const isUserPresent = !!user?._id;
  async function fetchData() {
    try {
      const messages = await getAllMessages();
      if (messages?.messages) {
        setMessages(messages?.messages);
        setIsFetching(false);
      }
    } catch (err) {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    if (isUserPresent) {
      setIsFetching(true);
      fetchData();
      // Will fetch messages here
    }
  }, [isUserPresent]);

  useEffect(() => {
    if (!isUserPresent && !isLoading) {
      router.push("/");
    }
  }, [isUserPresent, isLoading]);
  return (
    <>
      {isUserPresent ? (
        <Head>
          <title>Nazdeekiyaan | User {user.username}</title>
        </Head>
      ) : (
        <Head>
          <title>Nazdeekiyaan | User</title>
        </Head>
      )}
      <div className="row">
        <div className="col-lg-8 ">
          <h2 className="mb-3">{"Welcome #" + user?.name}</h2>
          <code>
            Share this message:{" "}
            <code suppressHydrationWarning>
              <Link href={userLink} target="_new">
                Hey There, Let&apos;s celebrate scribble day in a new way.
                <br />
                {user && <>Click Here: {userLink}</>}
              </Link>
            </code>
          </code>
          <br />
          <br />
          {messages && messages.length ? (
            messages.map((message, index) => (
              <SingleMessageCard key={index} message={message} />
            ))
          ) : (
            <ShowNoMessageCard loading={isLoading || isFetching} />
          )}
        </div>
      </div>
    </>
  );
};

const ShowNoMessageCard = (props: { loading: boolean }) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-8 ">
          We are glad that you join us!!
          <br />
          Please share your link to your friends aka family to get messages.
          <br />
          {props.loading
            ? "Finding your Scribble. Please Wait."
            : "You Don't have any messages yet."}
        </div>
      </div>
    </>
  );
};
