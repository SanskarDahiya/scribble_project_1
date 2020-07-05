import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./componnents/header";
import Footer from "./componnents/footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./componnents";
import SendToUserMessage from "./componnents/multiBlog";
import PAGENOTFOUND from "./componnents/pageNotFound";
import Login from "./componnents/login";

const localStoragename = "loginCredentials";
const App = (props) => {
  const [loginDetails, loginUpdater] = useState(false);
  // const [loginDetails, loginUpdater] = useState({ _id: "kunal", username: "admin" });
  const setLoginDetails = (data) => {
    try {
      // used for login as well as logout
      loginUpdater(data);
      if (data) {
        data["expired"] = new Date().getTime() + 1000 * 60 * 60 * 24;
        localStorage.setItem(localStoragename, JSON.stringify(data));
      } else {
        localStorage.removeItem(localStoragename);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    try {
      let data = localStorage.getItem(localStoragename);
      if (data) {
        data = JSON.parse("" + data);
        if (data["expired"] && data["expired"] > new Date().getTime()) {
          loginUpdater(data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <Router>
      <Route path="/" render={(zz) => <Header {...zz} user={loginDetails} userUpdate={setLoginDetails} />} />
      <Switch>
        <Route path="/" exact render={(myProps) => <Index {...props}{...myProps} user={loginDetails} userUpdate={setLoginDetails} />} />
        <Route path="/login" exact render={(myProps) => <Login {...myProps} user={loginDetails} userUpdate={setLoginDetails} />} />
        <Route path="/user" render={(myProps) => <SendToUserMessage {...myProps} user={loginDetails} userUpdate={setLoginDetails} />} />
        <Route path="*" component={PAGENOTFOUND} />
      </Switch>
      <Route path="/" component={Footer} />
    </Router>
  );
};

export default App;
