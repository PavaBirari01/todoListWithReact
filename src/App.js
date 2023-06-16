import React, { useState, useEffect } from "react";
import { Addtask } from "./components/Addtask";
import { Tasklist } from "./components/Tasklist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const notifyErr = () =>
    toast.error("Please fill valid value", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "toast-success",
    });

  const notifySuccess = () =>
    toast.success("Task added successfully.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "toast-success",
    });

  const notifyWarning = () =>
    toast.warning("Task Removed successfully.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "toast-success",
    });

  const [todoList, setTodoList] = useState(() => {
    const storedData = localStorage.getItem("todoList");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const onChangeHandler = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAdd = (newTodo) => {
    if (newTodo.trim() === "") {
      notifyErr();
    } else {
      const list = {
        id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
        taskName: newTodo,
      };
      notifySuccess();
      setTodoList([...todoList, list]);
      setNewTodo("");
    }
  };

  const deleteTask = (id) => {
    const updatedList = todoList.filter((task) => task.id !== id);
    setTodoList(updatedList);
    notifyWarning();
  
    // Remove task from local storage
    localStorage.removeItem(`completeState-${id}`);
    localStorage.removeItem(`editingState-${id}`);
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
