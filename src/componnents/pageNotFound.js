import React from "react";
import { Link } from "react-router-dom";
const PAGENOTFOUND = (props) => {
  console.log(props);

  return (
    <>
      <section className="ftco-section">
        <div className="container-fluid px-4">
          <div className="row justify-content-center mb-5 pb-2">
            <div className="col-md-8 text-center heading-section ">404 PAGE NOTE FOUND</div>
            <div className="col-md-8 text-center heading-section ">
              <Link to="/">HOME PAGE</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PAGENOTFOUND;
