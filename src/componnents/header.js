import React from "react";
import { Link } from "react-router-dom";
import { whiteText } from "../customStyles";
import { menuBar, logoUrl } from "../sampleData/forHeaderFooter";
import { EMAIL, PHONENUMBER } from "../sampleData/collegeDetails";

const Header = (props) => {
  const handleForm = (e) => {
    e.preventDefault();
    return;
  };
  return (
    <>
      <div className="bg-top navbar-light">
        <div className="container">
          <div className="row no-gutters d-flex align-items-center align-items-stretch">
            <div className="col-md-6 d-flex align-items-center py-4">
              <Link className="navbar-brand" to="/">
                <div style={{ ...whiteText }}>LOGO</div>
              </Link>
            </div>
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
                <LoginButton {...props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LoginButton = (props) => {
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
