import React, { Fragment, useState } from "react";
import NavBar from "./components/layout/NavBar";
import "./App.css";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import User from "./components/users/user";
import Alert from "./components/layout/alert";
import About from "./components/pages/about";
const App = (props) => {
  const [users, SetUsers] = useState(new Array());
  const [user, Setuser] = useState({});
  const [loading, Setloading] = useState(false);
  const [alert, setAlertVal] = useState(null);
  const [repos, SetRepo] = useState(new Array());

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

  //   const response = await axios.get(url);
  //   this.setState({ loading: false, users: response.data });
  // }
  const SearchUsers = async (searchtext) => {
    Setloading(true);
    let url = null;
    let response = null;
    if (searchtext.length !== 0) {
      url = `https://api.github.com/search/users?q=${searchtext}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
      response = await axios.get(url);
      Setloading(false);
      SetUsers(response.data.items);
    } else {
      url = `https://api.github.com/users?since=1995&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
      response = await axios.get(url);
      Setloading(false);
      SetUsers(response.data);
    }
  };
  const getUser = async (userName) => {
    Setloading(true);
    let url = `https://api.github.com/users/${userName}?since=1995&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    let response = await axios.get(url);
    Setloading(false);
    Setuser(response.data);
  };
  const getUserRepo = async (userName) => {
    Setloading(true);
    let url = `https://api.github.com/users/${userName}/repos?per_page=100&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    let response = await axios.get(url);
    Setloading(false);
    SetRepo(response.data);
  };

  const clearUsers = () => {
    Setloading(false);
    SetUsers(new Array());
  };
  const setAlert = (msg, type) => {
    setAlertVal({
      msg: msg,
      type: type,
    });
    setTimeout(() => {
      setAlertVal(null);
    }, 5000);
  };
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <Alert alert={alert} />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Fragment>
                <Search
                  searchUsers={SearchUsers}
                  clearUsers={clearUsers}
                  users={users}
                  setAlert={setAlert}
                />
                <Users users={users} loading={loading} />
              </Fragment>
            )}
          />
          <Route exact path="/about" component={About} />
          <Route
            exact
            path={`/user/:login`}
            render={(props) => (
              <User
                {...props}
                getUser={getUser}
                getRepos={getUserRepo}
                user={user}
                repos={repos}
                loading={loading}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
