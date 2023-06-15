import React, { useState } from "react";

export const Edittask = (props) => {
  const [edit, setEdit] = useState(false);
  const [editedTask, setEditedTask] = useState(props.task.taskName);

  const handleInputChange = (e) => {
    setEditedTask(e.target.value);
  };

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleUpdateClick = () => {
    props.editHandler({
      id: props.task.id,
      taskName: editedTask,
    });
    setEdit(false);
  };

  return (
    <>
      {edit ? (
        <>
          <input type="text" value={editedTask} onChange={handleInputChange} />
          <button onClick={handleUpdateClick}>Update</button>
        </>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </>
  );
};
