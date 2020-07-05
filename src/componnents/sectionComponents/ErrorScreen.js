import React from "react";

const ErrorScreen = (props) => {
  const onClick = props.onClick;
  let error = props.error;
  if (!onClick || !error || !(error instanceof Object)) {
    console.error("Provide onClick ");
    return <></>;
  }

  return (
    <div>
      <div className={"wrapper"}>
        <div className={"container"}>
          <div
            style={{
              zIndex:10000,
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                border: "0px solid red",
                minHeight: 100,
                minWidth: 100,
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div>Warning!</div>
              <div>{error.name || ""}</div>
              <div>{error.message || ""}</div>
              <div>
                <button
                  type="submit"
                  onClick={onClick}
                  className="btn-primary btn-block"
                  style={{
                    borderRadius: 5,
                    border: "0px solid red",
                    padding: "12 18",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  okay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
