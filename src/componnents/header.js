import React from "react";
import { Link } from "react-router-dom";
import { whiteText } from "../customStyles";
export const menuBar = [
  { name: "Home", link: "/" },
  { name: "Trends", link: "/trends" }
];
const alertIndex = "ALERT_July_7th";

const Header = props => {
  const userUpdater = props.userUpdate;
  let alert_ = localStorage.getItem(alertIndex) || {};
  try {
    alert_ = JSON.parse(alert_);
  } catch (err) {
    alert_ = { count: true };
  }
  // alert(JSON.stringify(alert_));
  // alert(alert_["count"] === 4 || alert_["count"] === 5 || alert_["expire"] < new Date().getTime());
  if (alert_["count"] || alert_["expire"] < new Date().getTime()) {
    alert("Hello Friends,\nNow you can write for us also.\nsee trends sections for more detail\n\nThanks");
    localStorage.setItem(
      alertIndex,
      JSON.stringify({ count: false, expire: new Date().getTime() + 1000 * 60 * 60 * 24 })
    );
  }
  const handleForm = e => {
    e.preventDefault();
    return;
  };
  // console.log(props, props.location.pathname.search("login"));
  let loc = ("" + window.location)
    .split("/")
    .splice(0, 3)
    .join("/");

  return (
    <>
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          opacity: 0.4,
          zIndex:-1,
          minWidth: "109%",
          minHeight: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundImage: `url("${loc}/backgroundImage.jpg")`,
        }}
      /> */}
      <div className="bg-top navbar-light">
        <div className="container">
          <div className="row no-gutters d-flex align-items-center align-items-stretch">
            <div className="col-md-6 d-flex align-items-center py-4">
              <Link className="navbar-brand" to="/">
                <div style={{ ...whiteText }}>NAZDEEKIYAAN</div>
              </Link>
            </div>
            {/* <LoginButtonWrapper {...props} /> */}
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg ftco-navbar-light" id="ftco-navbar">
        <div className="container d-flex align-items-center px-4">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu" /> Menu
          </button>
          {/* <form onSubmit={handleForm} className="searchform order-lg-last">
            <div className="form-group d-flex">
              <input type="text" className="form-control pl-3" placeholder="Search" />
              <button type="submit" className="form-control search">
                <span className="ion-ios-search" />
              </button>
            </div>
          </form> */}
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav mr-auto">
              {menuBar.map((elem, id) => (
                <li key={id} className="nav-item">
                  <Link to={elem.link} className="nav-link">
                    {elem.name}
                  </Link>
                </li>
              ))}
              <li className="nav-item">
                {props && props.user ? (
                  <Link
                    onClick={() => {
                      userUpdater(false);
                    }}
                    to="/login"
                    className="nav-link"
                  >
                    <span id="username1">Sign-Out: {JSON.stringify((props.user && props.user.username) || {})}</span>
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link">
                    <span id="username">Login</span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
const LoginButtonWrapper = props => {
  let isNotLoginPage = false;
  if (props && props.location && props.location.pathname) {
    isNotLoginPage = (props.location.pathname + "").search("login") === -1;
  }
  return (
    <div className="col-md-6 d-block align-items-center py-4">
      <div className="row d-flex">
        {/* <div className="col-md d-flex topper align-items-center align-items-stretch py-md-4">
      <div className="icon d-flex justify-content-center align-items-center">
        <span className="icon-phone2" />
      </div>
      <div className="text">
        <span>Call</span>
        <span>Call Us: {PHONENUMBER}</span>
      </div>
    </div> */}
        {isNotLoginPage && <LoginButton {...props} />}
      </div>
    </div>
  );
};
const LoginButton = props => {
  const userUpdater = props.userUpdate;
  return (
    <>
      <div className="col-md d-flex align-items-center justify-content-end">
        <p>
          {props && props.user ? (
            <button
              onClick={() => {
                userUpdater(false);
              }}
              className="py-2 px-3 btn-primary d-flex align-items-center justify-content-center"
            >
              <span id="username1">signing off: {JSON.stringify((props.user && props.user.username) || {})}</span>
            </button>
          ) : (
            <Link to="/login" className="py-2 px-3 btn-primary d-flex align-items-center justify-content-center">
              <span id="username">Login</span>
            </Link>
          )}
        </p>
      </div>
    </>
  );
};

export default Header;
