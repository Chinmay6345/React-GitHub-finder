import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const navBar = (props) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={props.icon} />
        &nbsp;&nbsp;
        {props.title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

navBar.defaultProps = {
  title: "Git Hub Finder",
  icon: "fab fa-github",
};
navBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
export default navBar;
