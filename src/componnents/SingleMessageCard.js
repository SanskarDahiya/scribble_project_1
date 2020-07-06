import React from "react";

const SingleMessageCard = (props) => {
  let confirm = false;
  let name_ = (props.user.username + "").toLowerCase() === (props.user._id + "").toLowerCase() ? props.user._id : false;
  if (name_ && (name_.search("sanskardahiya") || name_.search("kunaljain") || name_.search("souravbansal"))) {
    confirm = true;
  }
  const { message: allMessages = {} } = props || {};
  const { message: { message = "", name = "" } = {} } = allMessages || {};
  const { index = -1 } = props || {};
  if (!message || !message.trim() || index === -1) {
    return <></>;
  }
  const getRandom = (x = 210) => Number(Math.random() * x);
  const r = getRandom();
  const g = getRandom();
  const b = getRandom();
  return (
    <div className="row" key={index}>
      <div className="col-sm-8 ">
        <div
          onClick={() => {
            props.history.push("/");
            console.log(index);
          }}
          style={{
            overflow: "hidden",
            position: "relative",
            padding: "16px 24px",
            backgroundColor: "#f5f5f5",
            margin: "5px 0px",
            border: "1px solid darkgrey",
            display: "flex",
            justifyContent: "center",
            borderBottomLeftRadius: 50,
            borderTopRightRadius: 50,
            paddingBottom: 25,
            alignItems: "center",
            flexDirection: "column",
            color: `rgb(${r},${g},${b})`,
          }}
        >
          <div>
            <p>{message}</p>
          </div>
          {confirm ? (
            <div>
              <sub>
                <code>FROM~{(allMessages && allMessages.from && allMessages.to._id) || "user not registered"}</code>
              </sub>
            </div>
          ) : (
            <></>
          )}
          {confirm ? (
            <div>
              <sub>
                <code>TO~{(allMessages && allMessages.to && allMessages.to._id) || "unknown"}</code>
              </sub>
            </div>
          ) : (
            <></>
          )}
          <div>
            <sub>
              <code>NAME~ {name || "unknown"}</code>
            </sub>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleMessageCard;
