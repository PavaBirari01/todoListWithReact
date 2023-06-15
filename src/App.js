import React from "react";
import { useState } from "react";
import { Addtask } from "./components/Addtask";
import { Tasklist } from "./components/Tasklist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
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
      // transition: "slide",
    });
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const onChangeHandler = (e) => {
    setNewTodo(e.target.value);
  };
  const handleAdd = (newTodo) => {
    if (newTodo.trim() === "") {
      // alert("please fill");
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
    const updatedList = todoList.filter((task) => {
      if (task.id === id) {
        return false;
      } else {
        return true;
      }
    });
    setTodoList(updatedList);
  };
  return (
    <>
      <h1>To do list</h1>
      {/* <input value={newTodo} onChange={onChangeHandler} />
      <button onClick={() => handleAdd(newTodo)}>Add Task</button> */}

      <Addtask
        onChangeHandler={onChangeHandler}
        handleAdd={handleAdd}
        newTodo={newTodo}
      />
      <ToastContainer />
      <div>
        {/* {todoList.map((task) => {
          {
             return (
            <ul>
              <li>
                {task.taskName}
                <button onClick={() => deleteTask(task.id)}>RemoveS</button>
              </li>
            </ul>
          ); 
          }
        })} */}
        {todoList.map((task) => (
          <Tasklist
            id={task.id}
            taskName={task.taskName}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </>
  );
};
export default App;
