import React, { Fragment, useState } from "react";
import { createUser } from "../http/index";

const InputUser = () => {
  const [name, setName] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    createUser(name);
    window.location = "/";
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5"> User List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputUser;
