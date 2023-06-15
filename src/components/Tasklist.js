import React, { useState, useEffect } from "react";
import { Edittask } from "./Edittask";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Tasklist = (props) => {
  const [complete, setComplete] = useState(() => {
    const storedData = localStorage.getItem(`completeState-${props.task.id}`);
    return storedData ? JSON.parse(storedData) : false;
  });

  const [editing, setEditing] = useState(() => {
    const storedData = localStorage.getItem(`editingState-${props.task.id}`);
    return storedData ? JSON.parse(storedData) : false;
  });

  const [editedTask, setEditedTask] = useState(props.task.taskName);

  useEffect(() => {
    localStorage.setItem(
      `completeState-${props.task.id}`,
      JSON.stringify(complete)
    );
    localStorage.setItem(
      `editingState-${props.task.id}`,
      JSON.stringify(editing)
    );
  }, [complete, editing, props.task.id]);

  const handleComplete = () => {
    setComplete(true);
    notify("Task completed successfully");
  };

  const handleUpdateClick = () => {
    props.editHandler({
      id: props.task.id,
      taskName: editedTask,
    });
    setEditing(false);
    notify("Task updated successfully");
  };
  const notifyAreadyCompleted = () => {
    notify1("Task already done!");
  };
  const notify = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "toast-success",
    });
  };
  const notify1 = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "toast-success",
    });
  };

  return (
    <>
      <ul>
        <li>
          {editing ? (
            <>
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              />
              <button onClick={handleUpdateClick}>Update</button>
            </>
          ) : (
            <span>{props.task.taskName}</span>
          )}

          {complete ? (
            <button onClick={notifyAreadyCompleted}>DONE</button>          ) : (
            <>
              {!editing && (
                <>
                  <button onClick={() => setEditing(true)}>Edit</button>
                  <button onClick={handleComplete}>Completed</button>
                </>
              )}
            </>
          )}
          <button onClick={() => props.deleteTask(props.task.id)}>
            Remove
          </button>
        </li>
      </ul>
    </>
  );
};
