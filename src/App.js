import React, { useState } from "react";
import "./App.css";
import Header from "./componnents/header";
import Footer from "./componnents/footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./componnents";
import MultiBlogs from "./componnents/multiBlog";
import PAGENOTFOUND from "./componnents/pageNotFound";
import Login from "./componnents/login";

const App = (props) => {
  // { _id: "5ee0f4e5e081ebe6a207e6f7", username: "admin" }
  const [loginDetails, loginUpdater] = useState(false);
  // const [loginDetails, loginUpdater] = useState({ _id: "5ee0f4e5e081ebe6a207e6f7", username: "admin" });
  const setLoginDetails = (data) => {
    loginUpdater(data);
  };
  return (
    <Router>
      <Route path="/" render={(zz) => <Header {...zz} user={loginDetails} userUpdate={setLoginDetails} />} />
      <Switch>
        <Route path="/" exact render={(myProps) => <Index {...myProps} user={loginDetails} userUpdate={setLoginDetails} />} />
        <Route path="/login" exact render={(myProps) => <Login {...myProps} user={loginDetails} userUpdate={setLoginDetails} />} />
        <Route path="/user" render={(myProps) => <MultiBlogs {...myProps} user={loginDetails} userUpdate={setLoginDetails} />} />
        <Route path="*" component={PAGENOTFOUND} />
      </Switch>
      <Route path="/" component={Footer} />
    </Router>
  );
};

export default App;
