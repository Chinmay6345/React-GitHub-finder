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
  };
  // async componentDidMount() {
  //   if (window.location.href === "http://localhost:3000/") {
  //     this.setState({ loading: true });
  //     const url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

  //     const response = await axios.get(url);
  //     this.setState({ loading: false, users: response.data });
  //   }
  // }
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
      url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
      response = await axios.get(url);
      this.setState({ loading: false, users: response.data });
    }
  };
  getUser = async (userName) => {
    this.setState({ loading: true });
    let url = `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    let response = await axios.get(url);
    this.setState({
      loading: false,
      user: response.data,
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
    const { users, user, alert, loading } = this.state;
    return (
      <div className="App">
        <NavBar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route path="/about" component={About} />
            <Route
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={this.getUser}
                  user={user}
                  loading={loading}
                />
              )}
            />
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
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
