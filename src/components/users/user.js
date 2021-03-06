import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Repos from "../repositories/repos";
const User = (props) => {
  useEffect(() => {
    props.getUser(props.match.params.login);
    props.getRepos(props.match.params.login);
    //eslint-disable-next-line
  }, []);
  const {
    name,
    avatar_url,
    location,
    bio,
    login,
    html_url,
    followers,
    following,
    public_gists,
    public_repos,
    hireable,
    company,
    blog,
  } = props.user;
  const { repos } = props;
  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back to search
      </Link>
      Hireable :{" "}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt="cannot load"
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <h1>Location: {location}</h1>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a
            href={html_url}
            className="btn btn-dark my-1"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username</strong>&nbsp; {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company</strong>&nbsp; {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website</strong>&nbsp;{" "}
                  <a href={blog} target="_blank" rel="noreferrer">
                    {blog}
                  </a>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers :{followers}</div>
        <div className="badge badge-success">Following :{following}</div>
        <div className="badge badge-dark">
          Public repositories :{public_repos}
        </div>
        <div className="badge badge-light">Public gists :{public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};
export default User;
