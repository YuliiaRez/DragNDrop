import React, { Fragment, useEffect, useState } from "react";

import EditUser from "./EditUser";
import { fetchUsers, deleteUser, updateUser } from "../http/index";

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((data) =>
      setUsers([...data].sort((a, b) => b.id - a.id))
    );
  }, []);

  const delUser = (id) => {
    deleteUser(id);
    setUsers(users.filter((u) => u.id !== id));
  };

  /*functions for Drag n Drop names */
  const [draggableItem, setDraggableItem] = useState(null);

  function dragStartHandler(e, item) {
    setDraggableItem(item);
    e.target.style.color = "green";
  }
  function dragEndHandler(e) {
    e.target.style.color = "black";
  }
  function dragOverHandler(e) {
    e.preventDefault();
  }
  function dropHandler(e, item) {
    e.preventDefault();
    updateUser(item.id, draggableItem.name);

    updateUser(draggableItem.id, item.name);
    setUsers(
      users.map((u) => {
        if (u.id === item.id) {
          return { ...u, name: draggableItem.name };
        }
        if (u.id === draggableItem.id) {
          return { ...u, name: item.name };
        }

        return u;
      })
    );

    window.location = "/";
  }
  /*Sort by Rank */
  let sortedUsers = [...users].sort((a, b) => a.id - b.id);
  return (
    <Fragment>
      <table className="table table-hover mt-5 text-center">
        <thead>
          <tr>
            <td className="d-flex df-start">
              <span className="mr-4">Num</span>
              <span className="mr-5">Rank</span>
              <span>Name</span>
            </td>

            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={user.id}>
              <td className="d-flex df-start">
                <span className="mr-5"> {index + 1}</span>
                <span className="mr-5"> {user.id}</span>
                <span
                  draggable={true}
                  onDragStart={(e) => {
                    dragStartHandler(e, user);
                  }}
                  onDragLeave={(e) => {
                    dragEndHandler(e);
                  }}
                  onDragEnd={(e) => {
                    dragEndHandler(e);
                  }}
                  onDragOver={(e) => {
                    dragOverHandler(e);
                  }}
                  onDrop={(e) => {
                    dropHandler(e, user);
                  }}
                  style={{ cursor: "grab" }}
                >
                  {user.name}
                </span>
              </td>

              <td>
                <EditUser user={user} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => delUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListUsers;
