import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./componnents/header";
import Footer from "./componnents/footer";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Index from "./componnents";
import SendToUserMessage from "./componnents/multiBlog";
import PAGENOTFOUND from "./componnents/pageNotFound";
import Login from "./componnents/login";
import Trends from "./componnents/trends";
const loc = ("" + window.location)
  .split("/")
  .splice(0, 3)
  .join("/");

const localStoragename = "loginCredentials";
const App = props => {
  const [loginDetails, loginUpdater] = useState(false);
  const setLoginDetails = data => {
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
        if (!data.conn) {
          localStorage.removeItem(localStoragename);
          alert("please re-login, we are upgrading our services.\nIf issue arrive, please wait");
          return;
        }
        loginUpdater(data);
        // if (data["expired"] && data["expired"] > new Date().getTime()) {
        // }
      }
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <Router>
      <Route path="/" render={zz => <Header {...zz} user={loginDetails} userUpdate={setLoginDetails} />} />
      <Switch>
        <Route
          path="/"
          exact
          render={myProps => <Index {...props} {...myProps} user={loginDetails} userUpdate={setLoginDetails} />}
        />
        <Route
          path="/login"
          exact
          render={myProps => <Login {...myProps} user={loginDetails} userUpdate={setLoginDetails} />}
        />
        <Route
          path="/trends"
          exact
          render={myProps => <Trends {...props} {...myProps} user={loginDetails} userUpdate={setLoginDetails} />}
        />
        <Route
          path="/user"
          render={myProps => <SendToUserMessage {...myProps} user={loginDetails} userUpdate={setLoginDetails} />}
        />
        <Route
          path="/:id"
          render={myProps => <SendToUserMessage {...myProps} user={loginDetails} userUpdate={setLoginDetails} />}
        />
        <Route path="*" component={PAGENOTFOUND} />
      </Switch>
      <Route path="/" component={Footer} />
    </Router>
  );
};

export default App;
