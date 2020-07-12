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
      </div>
    );
  }
}
Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
};
export default Search;
