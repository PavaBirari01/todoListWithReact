import React, { useState } from "react";
import { Edittask } from "./Edittask";

export const Tasklist = (props) => {
  const [complete, setComplete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(props.task.taskName);

  const handleComplete = () => {
    setComplete(true);
  };

  const handleUpdateClick = () => {
    props.editHandler({
      id: props.task.id,
      taskName: editedTask,
    });
    setEditing(false);
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
            <button>DONE</button>
          ) : (
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
