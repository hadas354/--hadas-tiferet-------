/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./Todos.css";
export default function Todos() {
  const userData = JSON.parse(localStorage.getItem("currentUser"));
  const [todos, setTodos] = useState([]);
  const [sort, setSort] = useState("serial");
  const [searchById, setSearchById] = useState("");
  const [searchByTitle, setSearchByTitle] = useState("");
  const [searchByStatus, setSearchByStatus] = useState("");
  const [newTodoTitle, setNewTodoTitle] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/todos?userId=${userData.id}`
        );
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userData.id]);

  useEffect(() => {
    const sortTodos = () => {
      let sortedTodos = [...todos];
      switch (sort) {
        case "serial":
          sortedTodos.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
          break;
        case "status":
          sortedTodos.sort((a, b) => {
            if (a.completed && !b.completed) return -1;
            if (!a.completed && b.completed) return 1;
            return 0;
          });

          break;
        case "alphabetical":
          sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "random":
          sortedTodos.sort(() => Math.random() - 0.5);
          break;
        default:
          sortedTodos.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
      }
      setTodos(sortedTodos);
    };

    sortTodos();
  }, [sort]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/todos?userId=${userData.id}`
        );
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userData.id]);

  // useEffect(() => {
  //   const sortTodos = () => {
  //     let sortedTodos = [...todos];
  //     // ... (rest of your sorting logic)
  //     setTodos(sortedTodos);
  //   };

  //   sortTodos();
  // }, [sort]);

  function handleCheckboxChange(index) {
    let newTodos = [...todos];
    newTodos[index] = {
      ...newTodos[index],
      completed: !newTodos[index].completed,
    };
    setTodos(newTodos);
    updateDBCheckbox(newTodos[index]);
  }
  async function updateDBCheckbox(todo) {
    const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((error) => {
      console.log("Error:", error);
    });
  }
  async function deleteFromDB(index) {
    const todo = todos[index]; //שמור האיבר שעתיד להמחק
    console.log(index);
    let newTodos = [...todos]; // עמ למחוק אותו דבר--
    newTodos.splice(index, 1); //מחיקה
    setTodos(newTodos); //החזרת המערך המעודכן
    fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }, //מחיקה בDB
    }).catch((error) => {
      console.log("Error:", error);
    });
  }
  async function updateTodo(index) {
    let currentTitle = todos[index].title;
    let newTitle = prompt("Enter a new title:", currentTitle);
    let newTodos = [...todos];
    newTodos[index] = {
      ...newTodos[index],
      title: newTitle,
    };
    setTodos(newTodos);
    const todo = newTodos[index];
    const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((error) => {
      console.log("Error:", error);
    });
  }

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSort(selectedSort);
  };
  async function handleSearchSerial() {
    let data;
    if (searchById == "") {
      const res = await fetch(
        `http://localhost:3000/todos?userId=${userData.id}`
      );
      data = await res.json();
    } else {
      const res = await fetch(`http://localhost:3000/todos?id=${searchById}`);
      data = await res.json();
    }
    const newTodos = await [...data];
    setTodos(newTodos);
  }

  async function handleSearchTitle() {
    let data;
    const res = await fetch(
      `http://localhost:3000/todos?userId=${userData.id}`
    );
    data = await res.json();
    const newTodos = [...data];
    const filteredTodos = newTodos.filter(
      (item) => JSON.stringify(item.title).indexOf(searchByTitle) !== -1
    );
    setTodos(filteredTodos);
  }

  async function handleSearchStatus() {
    let filteredTodos;
    let data;
    const res = await fetch(
      `http://localhost:3000/todos?userId=${userData.id}`
    );
    data = await res.json();
    const newTodos = [...data];
    switch (searchByStatus) {
      case "done":
        filteredTodos = newTodos.filter((item) => item.completed == true);
        break;
      case "in progress":
        filteredTodos = newTodos.filter((item) => item.completed == false);
        break;
      default:
        filteredTodos = newTodos;
    }
    setTodos(filteredTodos);
  }
  const addNewTodo = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todos`, {
        method: "POST",
        body: JSON.stringify({
          userId: userData.id,
          title: newTodoTitle,
          completed: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.ok) {
        // Fetch the updated list of todos after adding a new one
        const updatedRes = await fetch(
          `http://localhost:3000/todos?userId=${userData.id}`
        );
        const updatedData = await updatedRes.json();
        setTodos(updatedData);
        setNewTodoTitle(""); // Clear the input field after adding the new todo
      } else {
        console.error("Failed to add new todo:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding new todo:", error);
    }
  };
  return (
    <div className="container">
      <h1>Todos🪁</h1>
      <label htmlFor="sort">Sort by:</label>
      <select name="sort" id="sort" onChange={handleSortChange} value={sort}>
        <option value="serial">Serial</option>
        <option value="status">Status</option>
        <option value="alphabetical">Alphabetical</option>
        <option value="random">Random</option>
      </select>
      <div id="search">
        <div id="searchFChild">
          <button onClick={handleSearchSerial}>Serial number</button>
          <button onClick={handleSearchTitle}>Title</button>
          <button onClick={handleSearchStatus}>Status</button>
        </div>
        <div id="searchSChild">
          <input
            type="text"
            placeholder="Enter id for search"
            value={searchById}
            onChange={(e) => setSearchById(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter title to search"
            value={searchByTitle}
            onChange={(e) => setSearchByTitle(e.target.value)}
          />
          <select
            name="status"
            id="ststus"
            onChange={(e) => setSearchByStatus(e.target.value)}
            value={searchByStatus}
          >
            <option value=""></option>
            <option value="done">done</option>
            <option value="in progress">in progress</option>
          </select>{" "}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Done</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((element, index) => (
            <tr key={index}>
              <td>{element.id}</td>
              <td>{element.title}</td>
              <td>
                <input
                  type="checkbox"
                  checked={element.completed}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td>
                <button className="button" onClick={() => deleteFromDB(index)}>
                  🗑️
                </button>
              </td>
              <td>
                <button className="button" onClick={() => updateTodo(index)}>
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <label htmlFor="newTodoTitle">New Todo Title:</label>
        <input
          type="text"
          id="newTodoTitle"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <button onClick={addNewTodo}>Add Todo</button>
      </div>
    </div>
  );
}
