import React from "react";
import { TodoModal } from "./TodoModal";

export const Todo = () => {
  const buttons = [
    {
      id: 1,
      text: "Add Task",
    },
    {
      id: 2,
      text: "Cancel",
    },
  ];

  const inputRef = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [todoTitle, setTodoTitle] = React.useState("Add Todo");
  const [btn, setBtn] = React.useState(buttons);

  const [todos, setTodos] = React.useState(() => {
    try {
      // Initialize todos with data from local storage, or an empty array if there's none
      const storedTodos = JSON.parse(localStorage.getItem("todos"));
      return storedTodos || [{ text: "Add todo", checked: false }];
      // return storedTodos || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  React.useEffect(() => {
    // Save todos to local storage whenever todos change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  //Show Modal
  const handleShow = () => {
    setShow(true);
  };
  //Close Modal
  const handleClose = () => {
    setShow(false);
  };
  // //Modal Title Input
  // const handleTitleChange = (e) => {
  //   const result = e.target.value;
  //   console.log(result);
  // };

  //Add Task Button
  const handleAddTask = (e) => {
    e.preventDefault();
    // Check if the input value is empty
    if (inputRef.current.value.trim() === "") {
      alert("Add title");
      return; // Stop the function execution if the input is empty
    }

    // const updatedVal = todos.map((todo, idx) => ({
    //   ...todo,
    //   text: inputRef.current.value,
    //   checked: false,
    // }));

    const updatedVal = [
      ...todos,
      { text: inputRef.current.value, checked: false },
    ];

    setTodos(updatedVal);
    inputRef.current.value = "";
    handleClose();
  };
  //Delete Todos
  const handleDelete = (idx) => {
    const removeTodos = todos.filter((_, id) => id !== idx);
    setTodos(removeTodos);
  };

  //Edit Todos

  const handleEdit = () => {
    handleShow();
    setTodoTitle("Update Todo");

    const newBtns = btn.map((b) => ({
      ...b,
      text: b.id === 1 ? "Update Task" : "Cancel",
    }));
    setBtn(newBtns);
  };

  //Toggle Check

  const toggleCheck = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].checked = !updatedTodos[index].checked;
    setTodos(updatedTodos);
  };

  const stylesChecked = (isChecked) => ({
    textDecoration: isChecked ? "line-through" : "none",
  });

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center justify-content-between">
        <button className="btn btn-primary" onClick={handleShow}>
          Add Todo
        </button>
        <select
          className="form-select w-25"
          aria-label="Default select example"
          defaultValue="All"
        >
          <option value="All">All</option>
          <option value="1">Incomplete</option>
          <option value="2">Completed</option>
        </select>
      </div>
      <div className="d-flex flex-column">
        {todos.length === 0 ? (
          <p className="h1">No Todos</p>
        ) : (
          <ul className="list-group mt-4">
            {todos.map((todo, idx) => (
              <li
                className="list-group-item d-flex align-items-center justify-content-between"
                key={idx}
              >
                <input
                  className="form-check-input me-3 mt-0"
                  type="checkbox"
                  value={todo.checked}
                  onChange={() => toggleCheck(idx)}
                />

                <span className="me-auto" style={stylesChecked(todo.checked)}>
                  {todo.text} {/* Render the 'text' property */}
                </span>
                <span className="d-flex align-items-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(idx)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-secondary ms-2"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <TodoModal
        show={show}
        close={handleClose}
        // handleTitleChange={handleTitleChange}
        handleAddTask={handleAddTask}
        inputRef={inputRef}
        todoTitle={todoTitle}
        buttons={btn}
      />
    </div>
  );
};
