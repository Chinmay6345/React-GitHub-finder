import React, { Component, Fragment } from "react";
import NavBar from "./components/layout/NavBar";
import "./App.css";
import axios from "axios";
import Users from "./components/users/Users";
class App extends Component {
  state = {
    users: [],
    loading: false,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const response = await axios.get("https://api.github.com/users");
    this.setState({ loading: false, users: response.data });
    console.log(this.state.users);
  }
  render() {
    return (
      <Fragment>
        <div className="App">
          <NavBar />
          <div className="container">
            <Users users={this.state.users} loading={this.state.loading} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
