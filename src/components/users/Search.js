import React, { useState } from "react";
import PropTypes from "prop-types";
const Search = (props) => {
  const [inputVal, setInputVal] = useState("");
  const { searchUsers, clearUsers, setAlert, users } = props;
  const setValue = (event) => {
    setInputVal(event.target.value);
  };
  const save = (event) => {
    event.preventDefault();
    if (inputVal.length == 0) {
      setAlert("Please enter a value", "light");
    } else {
      searchUsers(inputVal);
      setInputVal("");
    }
  };
  let btn = null;
  if (users.length > 0) {
    btn = (
      <button className="btn btn-light btn-block" onClick={clearUsers}>
        Clear
      </button>
    );
  }
  return (
    <div>
      <form className="form" onSubmit={save}>
        <input
          type="text"
          name="insrch"
          id="srch_txt"
          placeholder="Search users..."
          value={inputVal}
          onChange={(event) => setValue(event)}
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
};
Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
export default Search;
