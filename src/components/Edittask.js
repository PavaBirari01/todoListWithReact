import React, { useState, useEffect } from "react";

export const Edittask = (props) => {
  const [edit, setEdit] = useState(() => {
    const storedData = localStorage.getItem(`editState-${props.task.id}`);
    return storedData ? JSON.parse(storedData) : false;
  });
  const [editedTask, setEditedTask] = useState(props.task.taskName);

  useEffect(() => {
    localStorage.setItem(`editState-${props.task.id}`, JSON.stringify(edit));
  }, [edit, props.task.id]);

  useEffect(() => {
    setEditedTask(props.task.taskName);
  }, [props.task.taskName]);

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
          <button onClick={handleUpdateClick}><i class="fa fa-save">Update</i></button>
        </>
      ) : (
        <button onClick={handleEditClick}><i class="fa fa-pencil">Edit</i></button>
      )}
    </>
  );
};
