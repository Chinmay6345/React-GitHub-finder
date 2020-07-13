import React, { Component, Fragment } from "react";
import NavBar from "./components/layout/NavBar";
import "./App.css";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import User from "./components/users/user";
import Alert from "./components/layout/alert";
import About from "./components/pages/about";
class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: [],
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const response = await axios.get(url);
    this.setState({ loading: false, users: response.data });
  }
  SearchUsers = async (searchtext) => {
    this.setState({ loading: true });
    let url = null;
    let response = null;
    if (searchtext.length !== 0) {
      url = `https://api.github.com/search/users?q=${searchtext}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
      response = await axios.get(url);
      this.setState({
        loading: false,
        users: response.data.items,
      });
    } else {
      url = `https://api.github.com/users?since=1995&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
      response = await axios.get(url);
      this.setState({ loading: false, users: response.data });
    }
  };
  getUser = async (userName) => {
    this.setState({ loading: true });
    let url = `https://api.github.com/users/${userName}?since=1995&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    let response = await axios.get(url);
    this.setState({
      loading: false,
      user: response.data,
    });
  };
  getUserRepo = async (userName) => {
    this.setState({ loading: true });
    let url = `https://api.github.com/users/${userName}/repos?per_page=100&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    let response = await axios.get(url);
    this.setState({
      loading: false,
      repos: response.data,
    });
  };

  clearUsers = () => {
    this.setState({ loading: false, users: [] });
  };
  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg: msg,
        type: type,
      },
    });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };
  render() {
    const { users, user, alert, loading, repos } = this.state;
    return (
      <div className="App">
        <NavBar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={this.SearchUsers}
                    clearUsers={this.clearUsers}
                    users={users}
                    setAlert={this.setAlert}
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
                  getUser={this.getUser}
                  getRepos={this.getUserRepo}
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
  }
}

export default App;
