import React from "react";

export const Addtask = (props) => {
  return (
    <>
      <input value={props.newTodo} onChange={props.onChangeHandler} />
      <button onClick={() => props.handleAdd(props.newTodo)}>Add Task</button>
    </>
  );
};
