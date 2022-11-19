import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchUsers, createUser, deleteUser, updateUser } from "./http";

function App() {
  const [userList, setUserList] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    fetchUsers().then((data) => setUserList([...data]));
  }, []);

  const addUser = (name) => {
    createUser(name).then((data) => {
      setUserList([...userList, data]);
      setValue("");
      // window.location = "/34";
      // alert(window.location);
      // window.location.reload(true);
      // alert(window.location);
    });
  };
  const delUser = (id) => {
    deleteUser(id);
    setUserList(userList.filter((u) => u.id !== id));
  };
  const updUser = (id, name) => {
    updateUser(id, name);
    setUserList(
      userList.map((u) => {
        if (u.id === id) u.name = name;
        return u;
      })
    );
  };

  const [drugingItem, setDrugingItem] = useState(null);
  /******************************************** */
  function dragStartHandler(e, item) {
    setDrugingItem(item);
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

    setUserList(
      userList.map((u) => {
        if (u.id === item.id) {
          return { ...u, name: drugingItem.name };
        }
        if (u.id === drugingItem.id) {
          return { ...u, name: item.name };
        }
        return u;
      })
    );
    e.target.style.opacity = "1";
  }
  /*********************************************** */
  return (
    <div className="App">
      <div className="list">
        <form action="" method="get" className="item">
          <div className="form">
            <label name="name">Enter name: </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="button">
            <input
              type="submit"
              value="ADD!"
              onClick={(e) => {
                e.preventDefault();
                addUser(value);
              }}
            />
          </div>
        </form>

        {userList.map((item, index) => (
          <div
            key={item.id * Math.random()}
            draggable
            className="item"
            onDragStart={(e) => {
              dragStartHandler(e, item);
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
              dropHandler(e, item);
            }}
          >
            {index + 1 + "   "}
            {item.name}
            <button
              onClick={() => {
                delUser(item.id);
              }}
            >
              DELETE
            </button>
            <button
              onClick={() => {
                console.log("item.id :>> ", item.id);
                updUser(item.id, "Alexander");
              }}
            >
              EDITE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
