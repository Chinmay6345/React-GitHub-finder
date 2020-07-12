import React, { Fragment } from "react";
import Spinner from "../../images/spinner.gif";
const spinner = () => {
  return (
    <Fragment>
      <img
        src={Spinner}
        alt="loading..."
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </Fragment>
  );
};
export default spinner;
