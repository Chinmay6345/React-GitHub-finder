import React, { Component } from "react";
import PropTypes from "prop-types";
class Search extends Component {
  state = {
    inputVal: "",
  };
  setValue = (event) => {
    this.setState({ inputVal: event.target.value });
  };
  Save = (event) => {
    event.preventDefault();
    this.props.searchUsers(this.state.inputVal);
    this.setState({ inputVal: "" });
  };
  render() {
    let btn = null;
    console.log(this.props.users.length > 0);
    if (this.props.users.length > 0) {
      btn = (
        <button
          className="btn btn-light btn-block"
          onClick={this.props.clearUsers}
        >
          Clear
        </button>
      );
    }
    return (
      <div>
        <form className="form" onSubmit={this.Save}>
          <input
            type="text"
            name="insrch"
            id="srch_txt"
            placeholder="Search users..."
            value={this.state.inputVal}
            onChange={(event) => this.setValue(event)}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {btn}
      </div>
    );
  }
}
Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
};
export default Search;
