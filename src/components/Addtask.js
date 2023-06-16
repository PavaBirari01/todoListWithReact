import React from "react";
import "font-awesome/css/font-awesome.min.css";

export const Addtask = (props) => {
  return (
    <>
      <input  className="inputField" value={props.newTodo} onChange={props.onChangeHandler}/>
      <button onClick={() => props.handleAdd(props.newTodo)} >
        <i class="fa fa-plus"></i> Add Task
      </button>{" "}
    </>
  );
};
