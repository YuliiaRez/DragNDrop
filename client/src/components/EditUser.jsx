import React, { Fragment, useState } from "react";

import { updateUser } from "../http/index";

const EditUser = ({ user }) => {
  const [name, setUserName] = useState(user.name);

  //edit name function

  const updateUserName = async (e) => {
    e.preventDefault();
    // try {
    //   const body = { name };
    //   const response = await fetch(`http://localhost:5000/users/${user.id}`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body),
    //   });

    //   window.location = "/";
    // } catch (err) {
    //   console.error(err.message);
    // }
    console.log("name", name);
    updateUser(user.id, name);
    window.location = "/";
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${user.id}`}
      >
        Edit
      </button>

      {/* 
        id = id10
      */}
      <div
        className="modal"
        id={`id${user.id}`}
        onClick={() => setUserName(user.name)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit User</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setUserName(user.name)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateUserName(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setUserName(user.name)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditUser;
