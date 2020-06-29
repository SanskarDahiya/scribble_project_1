import React from "react";
import SubPagesTopSection from "./sectionComponents/subPagesTopSection";
import BlogSections from "./sectionComponents/blogsSection";
import { Route, Redirect, Switch } from "react-router";
import SingleBlogSection from "./sectionComponents/singleBlogSection";
import CreateBLog from "./sectionComponents/createBlog";

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
