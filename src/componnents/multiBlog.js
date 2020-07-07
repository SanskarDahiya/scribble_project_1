import React from "react";
import { Route, Redirect, Switch } from "react-router";
import SingleBlogSection from "./sectionComponents/singleBlogSection";

const SendToUserMessage = props => {
  return (
    <>
      <Switch>
        <Route path="/:id" render={zz => <SingleBlogSection {...props} {...zz} />} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default SendToUserMessage;
