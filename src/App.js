// App.js
import React from "react";
import { useState } from "react";
import { Addtask } from "./components/Addtask";
import { Tasklist } from "./components/Tasklist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const notify = () =>
    toast.error("Please fill valid value", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const onChangeHandler = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAdd = (newTodo) => {
    if (newTodo.trim() === "") {
      notify();
    } else {
      const list = {
        id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
        taskName: newTodo,
      };

      setTodoList([...todoList, list]);
      setNewTodo("");
    }
  };

  const deleteTask = (id) => {
    const updatedList = todoList.filter((task) => task.id !== id);
    setTodoList(updatedList);
  };

  const editHandler = (updatedTask) => {
    const updatedList = todoList.map((task) => {
      if (task.id === updatedTask.id) {
        return {
          ...task,
          taskName: updatedTask.taskName,
        };
      }
      return task;
    });

    setTodoList(updatedList);
  };

  return (
    <>
      <h1>To do list</h1>
      <Addtask
        onChangeHandler={onChangeHandler}
        handleAdd={handleAdd}
        newTodo={newTodo}
      />
      <ToastContainer />
      <div>
        {todoList.map((task) => (
          <Tasklist
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            editHandler={editHandler}
          />
        ))}
      </div>
    </>
  );
};
export default App;
