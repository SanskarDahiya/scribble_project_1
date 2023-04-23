import React, { useState } from "react";
import { IScribble } from "../types";

const SingleMessageCard = (props: { message: IScribble }) => {
  const getColor = () => {
    const getRandom = (x = 230) => Number(Math.random() * x);
    const r = getRandom();
    const g = getRandom();
    const b = getRandom();
    return `rgb(${r},${g},${b})`;
  };
  const [color, colorUpdater] = useState(getColor());

  const { message, from } = props.message;

  let mofidiedMsg = message;
  try {
    mofidiedMsg = JSON.parse(message);
  } catch (err) {
    mofidiedMsg = message;
  }
  if (!mofidiedMsg || !mofidiedMsg.trim()) {
    return <></>;
  }
  return (
    <div
      className="row"
      style={{
        cursor: "pointer",
      }}
    >
      <div className="col-sm-8 ">
        <div
          onClick={() => {
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
            color: color || getColor() || "black",
          }}
        >
          <div>
            <p>
              {mofidiedMsg.split("\n").map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    {data}
                    <br />
                  </React.Fragment>
                );
              })}
            </p>
          </div>
          <div>
            <sub>
              <code>From~ {from || "unknown"}</code>
            </sub>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleMessageCard;
