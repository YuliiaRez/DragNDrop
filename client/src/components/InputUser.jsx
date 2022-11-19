import React, { Fragment, useState } from "react";
import { createUser } from "../http/index";

const InputUser = () => {
  const [name, setName] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    createUser(name);
    window.location = "/";
    // try {
    //   const body = { name };
    //   const response = await fetch("http://localhost:5000/users", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body),
    //   });

    //
    // } catch (err) {
    //   console.error(err.message);
    // }
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
