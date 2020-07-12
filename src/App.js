import React, { Component, Fragment } from "react";
import NavBar from "./components/layout/NavBar";
import "./App.css";
import axios from "axios";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import Alert from "./components/layout/alert";
class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const response = await axios.get(url);
    this.setState({ loading: false, users: response.data });
    console.log(this.state.users);
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
      url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
      response = await axios.get(url);
      this.setState({ loading: false, users: response.data });
    }
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
    return (
      <Fragment>
        <div className="App">
          <NavBar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Search
              searchUsers={this.SearchUsers}
              clearUsers={this.clearUsers}
              users={this.state.users}
              setAlert={this.setAlert}
            />
            <Users users={this.state.users} loading={this.state.loading} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
