import React from "react";
import { Link } from "react-router-dom";

function buildPagination(id, page = 0) {
  return (
    <ul class="nav">
      <li>
        <Link to={`/apps/${id}/${page}`}>Previous</Link>
      </li>
      <li>
        <Link to={`/apps/${id}/${page}`}>Next</Link>
      </li>
    </ul>
  );
}

export default function Users({ error, items, fetchUsers, appId }) {
  if (!items || !items.length) {
    fetchUsers();
    return <div>LOADING USERS...</div>;
  }

  return (
    <div id="users">
      {buildPagination(appId)}
      <ul>
        {items.map(({ id, name, email, avatar }) => {
          return (
            <li>
              <p>Name: {name}</p>
              <p>
                Email: <a href={`mailto:${email}`}>{email}</a>
              </p>
              <img src={avatar} alt={name} width="50" height="50" />
            </li>
          );
        })}
      </ul>
      {buildPagination(appId)}
    </div>
  );
}
