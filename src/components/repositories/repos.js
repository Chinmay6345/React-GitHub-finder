import React from "react";
import PropTypes from "prop-types";
import "../../css/bootstrap.css";
const repos = ({ repos }) => (
  <div className="card">
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Repository name</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo, index) => (
            <tr key={repo.id}>
              <td>{index + 1}</td>
              <td>{repo.name}</td>
              <td>
                <a href={repo.html_url}>{repo.html_url}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
repos.propTypes = {
  repos: PropTypes.array.isRequired,
};
export default repos;
