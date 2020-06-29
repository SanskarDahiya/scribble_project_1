import React from "react";
import { Route, Redirect, Switch } from "react-router";
import SingleBlogSection from "./sectionComponents/singleBlogSection";

const MultiBlogs = (props) => {
  return (
    <>
      <Switch>
        <Route path="/user" render={(zz) => <SingleBlogSection {...props} {...zz} />} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default MultiBlogs;
