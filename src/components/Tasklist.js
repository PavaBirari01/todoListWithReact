import React, { useState, useEffect } from "react";
import { Edittask } from "./Edittask";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
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
        <li className="taskListContainer">
          {editing ? (
            <>
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              />
              <button onClick={handleUpdateClick}>
                <i class="fa fa-save"></i>
                Update
              </button>
            </>
          ) : (
            <div className="taskName">{props.task.taskName}</div>
          )}

          {complete ? (
            <div className="buttonsContainer">
              <button onClick={notifyAreadyCompleted}>
                <i class="fa fa-check">Done</i>
              </button>
            </div>
          ) : (
            <>
              {!editing && (
                <>
                  <div className="buttonsContainer">
                    <button onClick={() => setEditing(true)}>
                      <i class="fa fa-pencil">Edit</i>
                    </button>
                    <button onClick={handleComplete}>
                      <i class="fa fa-check-circle">Completed</i>
                    </button>
                  </div>
                </>
              )}
            </>
          )}
          <button
            onClick={() => props.deleteTask(props.task.id)}
            className=""
          >
            <i class="fa fa-trash"> Remove</i>
          </button>
        </li>
      </ul>
    </>
  );
};
