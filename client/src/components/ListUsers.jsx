import React, { Fragment, useEffect, useState } from "react";

import EditUser from "./EditUser";
import { fetchUsers, deleteUser } from "../http/index";
import { sortASC, sortDESC } from "./sorting.js";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [draggableItem, setDraggableItem] = useState(null);

  const delUser = (id) => {
    deleteUser(id);
    setUsers(users.filter((u) => u.id !== id));
  };

  useEffect(() => {
    fetchUsers().then((data) =>
      setUsers([...data].sort((a, b) => b.id - a.id))
    );
  }, []);

  function dragStartHandler(e, item) {
    setDraggableItem(item);
  }
  function dragEndHandler(e) {
    e.target.style.opacity = "1";
  }
  function dragOverHandler(e) {
    e.preventDefault();
    e.target.style.opacity = "0.5";
  }
  function dropHandler(e, item) {
    e.preventDefault();

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
    e.target.style.opacity = "1";
  }
  let sortedUsers = [...users];
  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>
              <button
                className="btn btn-success"
                onClick={() => {
                  sortASC(sortedUsers);
                  setUsers(sortedUsers);
                }}
              >
                Sort A-Z
              </button>
              <button
                className="btn btn-warning"
                style={{ marginLeft: "18px" }}
                onClick={() => {
                  sortDESC(sortedUsers);
                  setUsers(sortedUsers);
                }}
              >
                Sort Z-A
              </button>
            </th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody style={{ cursor: "grab" }}>
          {sortedUsers.map((user, index) => (
            <tr
              draggable={true}
              key={user.id}
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
            >
              <td style={{ display: "flex", justifyContent: "flex-start" }}>
                <span style={{ marginRight: "15px" }}> {index + 1}</span>
                <span>{user.name}</span>
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
