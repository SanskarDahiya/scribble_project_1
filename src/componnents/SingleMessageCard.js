import React from "react";

const SingleMessageCard = (props) => {
  const { message: { message: { message = "", name = "" } = {} } = {} } = props || {};
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
            alignItems: "center",
            color: `rgb(${r},${g},${b})`,
          }}
        >
          <div>
            <p>{message}</p>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 5,
              right: 5,
            }}
          >
            <sub>
              <code>~{name || "unknown"}</code>
            </sub>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleMessageCard;
