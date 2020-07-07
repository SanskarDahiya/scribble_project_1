import React, { useState } from "react";

const SingleMessageCard = props => {
  const getColor = () => {
    const getRandom = (x = 230) => Number(Math.random() * x);
    const r = getRandom();
    const g = getRandom();
    const b = getRandom();
    return `rgb(${r},${g},${b})`;
  };
  const [color, colorUpdater] = useState(getColor());
  const { message: allMessages = {} } = props || {};
  const { message: { message = "", name = "" } = {} } = allMessages || {};
  const { index = -1 } = props || {};
  if (!message || !message.trim() || index === -1) {
    return <></>;
  }

  return (
    <div className="row" key={index}>
      <div className="col-sm-8 ">
        <div
          onClick={() => {
            // props.history.push("/");
            console.log(index);
            colorUpdater(getColor());
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
            color: color || getColor() || "black"
          }}
        >
          <div>
            <p>{message}</p>
          </div>
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
