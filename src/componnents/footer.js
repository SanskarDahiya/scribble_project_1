import React from "react";
import { menuBar } from "../sampleData/forHeaderFooter";
import { Link } from "react-router-dom";
import { EMAIL, PHONENUMBER, ADDRESS } from "../sampleData/collegeDetails";

const Footer = (props) => {
  return (
    <>
      <footer className="ftco-footer ftco-bg-dark ftco-section">
        <div className="container">
          <Bottom {...props} />
        </div>
      </footer>
    </>
  );
};

export default Footer;

const Bottom = (props) => {
  const { location: { pathname = "" } = {} } = props || {};
  return (
    <>
      <div className="row">
        <div className="col-md-12 text-center">
          <p>
            This Website Is Made With&nbsp;
            <i className="icon-heart" aria-hidden="true" />
            &nbsp;
            {(pathname.search("sanskar") > 0 || pathname.search("sourav") > 0) && "by Sourav and Sanskar"}
          </p>
        </div>
      </div>
    </>
  );
};
