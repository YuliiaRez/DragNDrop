import React, { Fragment, useEffect, useState } from "react";

import EditUser from "./EditUser";
import { fetchUsers, deleteUser } from "../http/index";

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  //delete user function

  // const deleteUser = async (id) => {
  //   try {
  //     const deleteUser = await fetch(`http://localhost:5000/users/${id}`, {
  //       method: "DELETE",
  //     });

  //     setUsers(users.filter((user) => user.id !== id));
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
  const delUser = (id) => {
    deleteUser(id);
    setUsers(users.filter((u) => u.id !== id));
  };

  // const getUsers = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/users");
  //     const jsonData = await response.json();

  //     setUsers(jsonData);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  useEffect(() => {
    fetchUsers().then((data) => setUsers([...data]));
  }, []);

  // console.log(users);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
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
